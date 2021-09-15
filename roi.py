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
            Video(data['points'])         
        return 'Sucesss', 200


def Video(points):

    p = points
    cap = cv2.VideoCapture('C:\\Path\\To\\Video\\Video.mp4')
    while(cap.isOpened()):
        r, img = cap.read()
        render(p,img)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


def render(points,image):
    global flag
    flag = 1
    img = image
    img = ResizeWithAspectRatio(img, width=520,height = 6000)
    img2 = img
    points.append(points[0])
    pts = np.array(points).reshape((-1,1,2)).astype(np.int32) * 1
        
    # (x,y,w,h)  = cv2.boundingRect(pts)
    # croped,o = img[y:y+h, x:x+w].copy()


#         pts = pts - pts.min(axis=0)

    mask = np.zeros(img.shape[:2], np.uint8)
    woo = cv2.drawContours(mask, [pts], -1, (255,255,255), -1, cv2.LINE_AA)

    dst = cv2.bitwise_and(img, img2, mask=mask)


    bg = np.ones_like(img, np.uint8)*255
    cv2.bitwise_not(bg,bg, mask=mask)
    dst2 = bg+ dst


    # cv2.imwrite("croped.png", croped)
    cv2.imwrite("mask.png", mask)
    cv2.imwrite("dst.png", dst)
    cv2.imwrite("dst2.png", dst2)
    # cv2.imwrite("woo.png",woo)
        
    frame = dst2

    Detector(frame,img,points,pts)

def Detector(frame,img,points,points2):
            
            rects, weights = HOGCV.detectMultiScale(frame, winStride=(4, 4), padding=(8, 8), scale=1.03)
            rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in rects])
            pick = non_max_suppression(rects, probs=None, overlapThresh=0.65)
            c = 1
            img = cv2.polylines(img, [points2], True, (0,255,0), thickness=3)
            for x, y, w, h in pick:
                cv2.rectangle(img, (x, y), (w, h), (139, 34, 104), 2)
                cv2.rectangle(img, (x, y - 20), (w,y), (139, 34, 104), -1)
                cv2.putText(img, f'P{c}', (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
                c += 1
                
            cv2.putText(img, f'Total Persons : {c - 1}', (20, 450), cv2.FONT_HERSHEY_DUPLEX, 0.8, (255, 255,255), 2)
#             cv2.imshow('frame',frame)
            cv2.imshow('Image', img)
            return frame


def ResizeWithAspectRatio(image, width=None, height=None, inter=cv2.INTER_AREA):
    dim = None
    (h, w) = image.shape[:2]

    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))

    return cv2.resize(image, dim, interpolation=inter)

if __name__=="__main__":
    HOGCV = cv2.HOGDescriptor()
    HOGCV.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
    app.run(port=5000, debug=True)