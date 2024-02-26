import os
import datetime
import cv2
from flask import Flask,jsonify,request,render_template
import face_recognition

app=Flask(__name__)

#creating a varuable register 
registered_data={}

@app.route("/")
def index():
    return render_template("index.html")

#creating a post method
@app.route("/register",methods=["POST"])
def register():
    name=request.form.get("name")
    photo=request.files['photo']
    #and now save your photos to uploads folder
    #when you register process
    uploads_folder=os.path.join(os.getcwd(),"static","uploads")
    #and if folder uploads not found this system will auto create folder uploads 

    if not os.path.exists(uploads_folder):
        os.makedirs(uploads_folder)


    #save your phoyo image with file name date now
    photo.save(os.path.join(uploads_folder,f'{datetime.date.today() }_{name}.jpg'))
    
    registered_data[name]=f"{datetime.date.today()}_{name}.jpg"


    #send success response then page will refresh and login
    response={"success":True,'name':name }
    return jsonify(response)


#now create login route post

@app.route("/login",methods=["POST"])
def login():
    photo=request.files['photo']
    #save yout photo login to folder uploads
    uploads_folder=os.path.join(os.getcwd(),"static","uploads")
    #and create folder if not found
    if not os.path.exists(uploads_folder):
        os.makedirs(uploads_folder)
    #and save file photo login with your name
    login_filename=os.path.join(uploads_folder,"login_face.jpg")
    photo.save(login_filename)

    #this process will detect your face is there or not in camera

    login_image=cv2.imread(login_filename)
    gray_image=cv2.cvtColor(login_image,cv2.COLOR_BGR2GRAY)

    #load your haarcascade file
    face_cascade=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml")
    faces=face_cascade.detectMultiScale(gray_image,scaleFactor=1.1,minNeighbors=5,minSize=(30,30))

    if len(faces)==0:
        response={"success":False}
        return jsonify(response)
    
    login_image=face_recognition.load_image_file(login_filename)

    # process and recognizes your face
    login_face_encodings=face_recognition.face_encodings(login_image)

    #  process your login phoyo with different photo after registering
    #with face recogniton

    for name,filename in registered_data.items():
        registered_photo=os.path.join(uploads_folder,filename)
        registered_image=face_recognition.load_image_file(registered_photo)

        registered_face_encodings=face_recognition.face_encodings(registered_image)
        #compare your image from login anf registered photo

        if len(registered_face_encodings)>0 and len(login_face_encodings)>0:
            matches=face_recognition.compare_faces(registered_face_encodings,login_face_encodings[0])

            #see matches
            print("matches:",matches)
            if any(matches):
                response={"success":True,"name":name}
                return jsonify(response)
            
        #if not match found 
        response={"success":False}
        return jsonify(response)
    
#this will show success if you successfully login
    
@app.route("/success")
def success():
    user_name=request.args.get("user_name")
    return render_template("success.html",user_name=user_name)


if __name__=="__main__":
    app.run(debug=True)
