from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import cv2 
import uuid
import os
import time
import numpy as np
from imutils.object_detection import non_max_suppression
app = Flask(__name__)
Cors = CORS(app)
@app.route('/test', methods=['GET', 'POST'])
def testfn():
    # GET request
    if request.method == 'GET':
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers
    # POST request
    if request.method == 'POST':
        # print(request.get_json())  # parse as JSON
        data = request.get_json()

        if 'points' in data.keys():
            render(data['points'])         
        return 'Sucesss', 200

def render(points):
    global flag
    flag = 1
    img_path = 'C:\\main\\Mycode\\reactjs\\roi\src\\photo.jpg'
    img = cv2.imread('C:\\main\\Mycode\\reactjs\\roi\src\\photo.jpg',1)
    print(type(img))
    img2 = img
    points.append(points[0])
    print(points)
    pts = np.array(points)
    print(pts)
        

    rect = cv2.boundingRect(pts)
    x,y,w,h = rect
    croped = img[y:y+h, x:x+w].copy()


#         pts = pts - pts.min(axis=0)

    mask = np.zeros(img.shape[:2], np.uint8)
    # woo = cv2.drawContours(mask, [pts], -1, (255, 255, 255), -1, cv2.LINE_AA)

    dst = cv2.bitwise_and(img, img2, mask=mask)

    bg = np.ones_like(img, np.uint8)*255
    cv2.bitwise_not(bg,bg, mask=mask)
    dst2 = bg+ dst


    # cv2.imwrite("croped.png", croped)
    cv2.imwrite("mask.png", mask)
    cv2.imwrite("dst.png", dst)
    cv2.imwrite("dst2.png", dst2)
    # cv2.imwrite("woo.png",woo)
        
    frame = cv2.imread('dst2.png')
    cv2.imshow('crop',frame)
    cv2.waitKey()
    key = cv2.waitKey(1)
    if key & 0xFF == ord('q'):
        cv2.destroyAllWindows()


if __name__=="__main__":
    app.run(port=5000, debug=True)