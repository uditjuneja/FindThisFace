import csv
permi_error_percent=int(input())
image_name=str(input())
names=['name']
rollnos=['rollno']
print('ihjmdf')
for i in range(0,4):
      if(True):
         print('Name: ','prayag')
         names.append('prauag')
         rollnos.append('10342')
         print('Rollno: ','101603248')
rows = zip(names,rollnos)
with open('./client/src/result_csv.csv', "w",newline='') as f:
    writer = csv.writer(f)
    for row in rows:
        writer.writerow(row)