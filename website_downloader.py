import mysql.connector
from tkinter import *
import requests
import random
import tkinter.messagebox
import urllib.request

con = mysql.connector.connect(

host="localhost", user="root",port="3307",

password="", database="python")

base = Tk()  

base.geometry('700x700')  

base.configure(bg='white smoke')

base.title("Website Downloader") 

cursor = con.cursor()

labl_6 = Label(base, text="____________________________________________________________________________________________", bg = "white smoke", width=2000 ,font=("bold underline " , 10))  

labl_6.pack(pady=0)

labl_0 = Label(base, text="Type Your URL:", bg = "white smoke", width=20 ,font=("bold", 20))  

labl_0.pack(pady=10)

entry_1 = Entry(base , width="100")  

entry_1.pack(pady=70)

def print_entered_value():
    value = entry_1.get()
    print(type(value))
    value1 = (value)
    print(type(value1))
    sql = "INSERT INTO web (link) VALUES ('"+value+"')"
    con1 = mysql.connector.connect(
	    host="localhost", user="root",port="3307",
	    password="", database="python")
    cursor1 = con1.cursor()
    cursor1.execute(sql, value)
    con1.commit()
    tkinter.messagebox.showinfo("Success",  "Successfully Downloaded!!!!")
    list1 = [ '1', '2' , '3' , '4' , '5' , '6' ]
    num = random.choice(list1)
    r = requests.get(value)
    with open("downloaded_"+num+"_website.html",'wb') as f:
	    f.write(r.content)
  
Button( base, text='Submit', width=50 , command=print_entered_value , bg='indian red' , fg='white' , borderwidth=0 ).pack(pady=70) 

query2 = "select * from web order by id DESC"

cursor.execute(query2)

table = cursor.fetchall()

print('\n Table Data:')

labl_5 = Label(base, text="____________________________________________________________________________________________", bg = "white smoke", width=2000 ,font=("bold underline " ,10))  
labl_5.pack(pady=0)

labl_4 = Label(base, text="Recent Downloads", bg = "white smoke", width=900 ,font=("bold underline " , 20))  
labl_4.pack(pady=10)

for row in table:
	print(row)
	labl_2 = Label(base, text=row, bg = "white smoke", width=900 ,font=("bold", 10))  
	labl_2.pack(pady=20)

cursor.close()

con.close()

base.mainloop()  
