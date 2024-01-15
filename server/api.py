from flask import Flask, request, jsonify
from flask_cors import CORS

import sqlite3
app = Flask("bookStore_api")
CORS(app, resources=r'/api/*')
DB_Path = "E-Commerce\data\BookStoreSiteDB.db"

#codes
#200-OK
#204-ok with no content returned
#400-bad request

# gets all books 
@app.route("/api/books", methods = ["GET"])
def getAllProducts():
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        query = f"""select productId,Title,Author,Price from products """
        # execute querry
        productsData= cursor.execute(query) 
        productsData = list(productsData)
        #close connection to DB
        connection.close() 
        # create response with all of the products
        response = {}
        for productElement in productsData:
           id =int(productElement[0])
           book_title = productElement[1]
           book_author = productElement[2]
           book_price = productElement[3]
           book={
               "id": id,
               "title": book_title,
               "author":book_author,
               "price": book_price
           }
           response[id] = book

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500
#get products by input
@app.route("/api/searchBooks/<input>", methods = ["GET"])
def searchBooks(input):
    # {
    #     "title":"Title"
    # }
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        query = f"""select productId,Title,Author,Price from products where Title LIKE '%{input}%'"""
        # execute querry
        productsData= cursor.execute(query) 
        productsData = list(productsData)
        #close connection to DB
        connection.close() 
        # create response with all of the products
        response = {}
        for productElement in productsData:
           id =int(productElement[0])
           book_title = productElement[1]
           book_author = productElement[2]
           book_price = productElement[3]
           book={
               "id": id,
               "title": book_title,
               "author":book_author,
               "price": book_price
           }
           response[id] = book

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500
# gets book details 
@app.route("/api/book/<book_id>", methods = ["GET"])
def getProduct(book_id):
    try:
        # create connection to db / create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        query = f"""select * from products Where productId = {book_id}"""
        # execute querry
        bookData= cursor.execute(query) 
        bookData = list(bookData)[0]
        #close connection to DB
        connection.close() 
        #create response with product with specified id
        response = {
            "id": bookData[0],
            "title": bookData[1],
            "description": bookData[2],
            "author": bookData[3],
            "price": bookData[4]
        }

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500
# gets all users
@app.route("/api/users", methods = ["GET"])
def getAllUsers():
    try:
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        query = """select userid, email from users where accountType = 'Client' and status = 'active' """
        data = list(cursor.execute(query))
        connection.close()
        response = {}
        for el in data:
            response[el[0]] = el[1]
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,200
    except Exception as error:
         # codul pt erori 
        response = {
         "message": f"Something went wrong. Cause: {error}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
# gets user details  
@app.route("/api/user/<userId>", methods = ["GET"])
def getUserDetails(userId):
    try:
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        query = f"""select username,email,password from users where userid = {userId}"""
        data = list(cursor.execute(query))[0]
        connection.close()
        response = {
            "userId": userId,
            "username":data[0],
            "email":data[1],
            "password":data[2]
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,200
    except Exception as error:
         # codul pt erori 
        response = {
         "message": f"Something went wrong. Cause: {error}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
# gets all adresses
@app.route("/api/adresses/<userId>", methods = ["GET"])
def getUserAdresses(userId):
    try:
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        query = f"""select adressId, details from adresses where userid = {userId} and status = 'active'"""
        data = list(cursor.execute(query))
        if len(data) == 0: 
            response = {
             "message": f"There are no adresses available"
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 204
        connection.close()
        response= {}
        for el in data:
            response[el[0]] = {
            "adressId":el[0],
            "details":el[1]
            }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,200
    except Exception as error:
         # codul pt erori 
        response = {
         "message": f"Something went wrong. Cause: {error}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
#gets all payment methods
@app.route("/api/paymentMethods/<userId>", methods = ["GET"])
def getPaymentMethods(userId):
    try:
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        query = f"""select paymentId, cardHolderName, number, type from paymentDetails where userid = {userId} and status = 'active'"""
        data = list(cursor.execute(query))
        if len(data) == 0: 
            response = {
             "message": f"There are no cards available"
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 204
        connection.close()
        response= {}
        for el in data:
            response[el[0]] = {
            "paymentId":el[0],
            "cardHolderName":el[1],
            "cardNumber":el[2],
            "cardType":el[3]
            }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,200
    except Exception as error:
         # codul pt erori 
        response = {
         "message": f"Something went wrong. Cause: {error}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
#create user - signUp
@app.route("/api/createUser", methods= ["POST"])
def createUser():
    body = request.json
    try: 
        
        #connection open/ create cursor
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()

        # try to insert !email uniqueness
        try:
            query = f"""INSERT INTO users(username,email,password) values ('{body["username"]}','{body["email"]}','{body["password"]}')"""
            #execute query
            cursor.execute(query)
            connection.commit()
        except Exception as error:
            # codul pt erori 
            print(error)
            response = {
                "message": f"This email is already in use."
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response, 400
        
        #close connection
        connection.close()
        #create response with the id of the product
        response = {
                "message": "Creation successfull"
        }
        response= jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200
    except Exception as error:
        # codul pt erori 
        response = {
            "message": f"Something went wrong. Cause: {error}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
# log in
@app.route("/api/signIn", methods = ["POST"])
def logIn():
    body = request.json
    print(body)
    try:
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        query = f"""SELECT userid, username, password, accountType from users WHERE email = '{body["email"]}'"""
        try:
            data = list(cursor.execute(query))
            connection.close()
            if len(data)==0:
                response = {
                        "problem":"email",
                        "message":"Invalid email"
                    }
                print(response)
                response=jsonify(response)
                response.headers.add("Access-Control-Allow-Origin","*")
                return response,400                       
            else:
                data = data[0]
                if data[2] == body["password"]:
                    response ={
                        "userId": data[0],
                        "accountType":data[3],
                        "message":"Log In successfull"
                    }
                    response = jsonify(response)
                    response.headers.add("Access-Control-Allow-Origin","*")
                    return response,200                
                else:
                    response = {
                        "problem":"password",
                        "message":"Wrong password"
                    }
                    response=jsonify(response)
                    response.headers.add("Access-Control-Allow-Origin","*")
                    return response,400    
        except Exception as error:
            #error code
            connection.close()            
            response = {
                "Message":f"Something went wrong. Cause {error}"
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin","*")
            return response,500 


        
    except Exception as error:
        #error code
        response = {
            "Message":f"Something went wrong. Cause {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,500

#update user details
@app.route("/api/editUser/<userId>", methods = ["PUT"])
def editUser(userId):
    body = request.json
    try:
        username = body['username']
        email = body['email']
        password = body['password']
        #checks if username is not null
        if len(username) == 0:
            response = {
            "message":"Invalid username change. (Is null)"
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response,400
        
        #checks if email is not null
        if len(email) ==0:
            response = {
            "message":"Invalid email change. (Is null)"
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response,400
        
        #checks if password is not null
        if len(password) ==0:
            response = {
            "message":"Invalid password change. (Is null)"
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response,400
        
        
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        
        # email exists validation
        try:
            #define query
            query = f"""
                UPDATE users 
                SET 
                    username=?,
                    email=?,
                    password=?
                WHERE 
                    userid=?"""
            #execut query with the parameters provided
            cursor.execute(query, (username, email, password, userId))
            #commit changes
            connection.commit()
        except Exception as error:
            response = {
                "message":f"This email already exists. "
            }
            response = jsonify(response)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response,400

        #close connection to db
        connection.close()
        #request successfull
        response = {
            "message":"Update successfull"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200 #204 no content
        
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,500

#delete user
@app.route("/api/deleteUser/<userId>", methods = ["PUT"])
def deleteUser(userId):
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        #define query
        query = f"""
                UPDATE users 
                SET 
                status = 'inactive'
                WHERE 
                    userid=?"""
        #execute query
        cursor.execute(query,(userId))
        #commit changes
        connection.commit()
        #close connection to db
        connection.close()
        #request successfull
        response = {
            "message":"Delete successfull"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 200
    except Exception as error:
        #error code
        response = {
            "Message":f"Something went wrong. Cause {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,500

#get all orders
@app.route("/api/getAllOrders/<userId>", methods = ["GET"])
def getAllOrders(userId):
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        query = f"""SELECT orderId FROM orders WHERE userId = {userId}"""
        allOrderIds= list(cursor.execute(query))
        if len(allOrderIds) ==0:
            response ={
                "message":"No orders for this user"
            }
        else:
            response = {}
            for orderId in allOrderIds:
                query2 = f"""select totalPrice,datePlaced, dateReceived from orders where orderId = {orderId[0]}"""
                orderDetails = list(cursor.execute(query2))[0]

                response[orderId[0]] = {
                    "totalPrice":orderDetails[0],
                    "datePlaced":orderDetails[1],
                    "dateReceived":orderDetails[2],
                }

                query3 = f"""SELECT productId from orderItems where orderId = {orderId[0]}"""
                products = list(cursor.execute(query3))
                response[orderId[0]]["productsIds"] = {}
                # print(products)
                for productId in products:
                    response[orderId[0]]["productsIds"][productId[0]] = productId[0]

        #close connection to DB
        connection.close() 
        # create response with all of the products

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500    

#get order details
@app.route("/api/getOrderDetails/<orderid>", methods = ["GET"])
def getOrderDetails(orderid):
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        query = f"""SELECT totalPrice, datePlaced, dateReceived, adressId, paymentId FROM orders WHERE orderid = {orderid}"""
        orderDetails= list(cursor.execute(query))[0]

        totalPrice = orderDetails[0]
        datePlaced = orderDetails[1]
        dateReceived =orderDetails[2]
        adressId = orderDetails[3]
        paymentId = orderDetails[4]

        query2 = f"""SELECT Details from adresses where adressId = {adressId}"""
        orderAdress = list(cursor.execute(query2))[0]

        query3 = f"""select cardHolderName,number,type from paymentDetails where paymentId = {paymentId}"""
        orderPaymentDetails = list(cursor.execute(query3))[0]

        cardHolderName = orderPaymentDetails[0]
        cardNumber = orderPaymentDetails[1]
        cardType = orderPaymentDetails[2]
        response = {
            orderid:{}
        }

        response[orderid]={
            "totalPrice":totalPrice,
            "datePlaced":datePlaced,
            "dateReceived":dateReceived,
            "orderAdress":orderAdress,
            "cardHolderName":cardHolderName,
            "cardNumber":cardNumber,
            "cardType":cardType,
        }
        response[orderid]["products"] = {}

        query4 = f"""select productId from orderItems where orderId={orderid}"""
        productIds = list(cursor.execute(query4))

        for id in productIds:
            query5 = f"""select Title, Price  from products where productId = {id[0]}"""
            productDetails = list(cursor.execute(query5))[0]
            response[orderid]["products"][id[0]] = {}
            response[orderid]["products"][id[0]]["productId"] =id[0]
            response[orderid]["products"][id[0]]["title"] =productDetails[0]
            response[orderid]["products"][id[0]]["price"] =productDetails[1]

        #close connection to DB
        connection.close() 
        # create response with all of the products

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500  
#create order
@app.route("/api/createOrder", methods = ["POST"])
def createOrder():
    body = request.json
    # {
    #     "userId": 1,
    #     "totalPrice": "to be calculated",
    #     "datePlaced": "15/12/2023",
    #     "adressId": "2",
    #     "paymentId": "1",
    #     "products": {
    #         "5":"5",
    #         "1":"1",
    #         "3":"3"
    #     }
    # }
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        userId = body["userId"]
        totalPrice = body["totalPrice"]
        datePlaced = body["datePlaced"]
        adressId = body["adressId"]
        paymentId = body["paymentId"]
        productsIds = body["products"]
        query1 = f"""INSERT INTO
                orders(userId,totalPrice,datePlaced,adressId,paymentId)
                VALUES('{userId}','{totalPrice}','{datePlaced}','{adressId}','{paymentId}')
                """
        
        cursor.execute(query1)
        connection.commit()

        query2 = "select last_insert_rowid() from orders"
        orderId = list(cursor.execute(query2))[0]
        print("Success")
        for id in productsIds:
            query3 = f""" INSERT INTO orderItems(orderId,productId) VALUES('{orderId[0]}',{id})"""
            cursor.execute(query3)
            connection.commit()

        #close connection to DB
        connection.close() 
        # create response with all of the products
        response = {
            "message":"Order Placed Successfully"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500  
#show items from cart
@app.route("/api/showCartItems", methods = ['GET'])
def showCartItems():
    body = request.json

    {
        "products":{
            "1":"1",
            "2":"2",
            "3":"3"
        }
    }
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        response = {}
        for productId in body["products"]:
            query = f"""SELECT Title, Price from products where productId = {productId}"""
            productDetails = list(cursor.execute(query))[0]
            response[productId] = {
                "title":productDetails[0],
                "price":productDetails[1]
            }
        connection.close() 
        # create response with all of the products

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500    

#total price for items 
@app.route("/api/totalPriceForItems", methods = ['GET'])
def getTotalPriceForItems():
    body = request.json
    # {
    #     "products":{
    #         "1":"1",
    #         "2":"2",
    #         "3":"3"
    #     }
    # }
    try:
        #connect to db/ create cursor
        connection = sqlite3.connect(DB_Path) 
        cursor = connection.cursor()
        # define query
        totalPrice = 0.00
        response = {}
        for productId in body["products"]:
            query = f"""SELECT Price from products where productId = {productId}"""
            productDetails = list(cursor.execute(query))[0]
            totalPrice = totalPrice + float(productDetails[0])

        response ={
            "totalPrice":round(totalPrice,2)
        }
        connection.close() 
        # create response with all of the products

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response,200
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin","*")
        return response, 500
#add card
@app.route("/api/addCard/<userId>", methods= ["POST"])
def addCard(userId):
    body = request.json
    # {
    #     "cardHolderName":"Anthony",
    #     "cardNumber":"39871293421",
    #     "cardType": "Mastercard"
    # }
    try: 
        
        #connection open/ create cursor
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()

        cardHolderName = body["cardHolderName"]
        cardNumber = body["cardNumber"]
        cardType = body["cardType"]

        query = f"""INSERT INTO paymentDetails(userId,cardHolderName,number,type) values('{userId}','{cardHolderName}','{cardNumber}','{cardType}')"""
        cursor.execute(query)
        connection.commit()
        query2 = "select last_insert_rowid() from paymentDetails"
        cardid = list(cursor.execute(query2))[0]
        connection.close()
        response = {
                "cardId":cardid[0],
                "cardHolderName":cardHolderName,
                "cardNumber":cardNumber,
                "cardType": cardType,
                "message": "Card added successfuly"
        }
        response= jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200


    except Exception as error:
        # codul pt erori
        connection.close()
        response = {
            "message": f"Something went wrong. Cause: {error}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
#add adress
@app.route("/api/addAdress/<userId>", methods= ["POST"])
def addAdress(userId):
    body = request.json
    # {
    #     "Details":"Strada dumbrava"
    # }
    try: 
        #connection open/ create cursor
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()

        details = body["Details"]

        query1 = f"""INSERT INTO adresses(userId,Details) values('{userId}','{details}')"""
        cursor.execute(query1)
        connection.commit()
        query2 = "select last_insert_rowid() from adresses"
        adressId = list(cursor.execute(query2))[0]

        #close connection
        connection.close()
        response = {
                "adressId":adressId[0],
                "details": details,
                "message": "Adress added successfuly"
        }
        response= jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200
    except Exception as error:
        # codul pt erori 
        response = {
            "message": f"Something went wrong. Cause: {error}."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 500
#delete card 
@app.route("/api/deleteCard/<cardId>", methods = ["PUT"])
def deleteCard(cardId):
    try:
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        
        #define query
        query = f"""
            UPDATE paymentDetails 
            SET 
                status='inactive'
            WHERE 
                paymentId=?"""
        #execut query with the parameters provided
        cursor.execute(query,(cardId,))
        #commit changes
        connection.commit()

        #close connection to db
        connection.close()
        #request successfull
        response = {
            "message":"Successfully removed the card."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200 #204 no content
        
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,500
#delete adress
@app.route("/api/deleteAdress/<adressId>", methods = ["PUT"])
def deleteAdress(adressId):
    try:
        connection = sqlite3.connect(DB_Path)
        cursor = connection.cursor()
        
        #define query
        query = f"""
            UPDATE adresses 
            SET 
                status='inactive'
            WHERE 
                adressId=?"""
        #execut query with the parameters provided
        cursor.execute(query,(adressId,))
        #commit changes
        connection.commit()

        #close connection to db
        connection.close()
        #request successfull
        response = {
            "message":"Successfuly removed the adress"
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200 #204 no content
        
    except Exception as error:
        #error code
        response = {
            "message":f"Something went wrong. Cause: {error}"
        }
        print(response)
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response,500
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)