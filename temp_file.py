from PIL import Image
permi_error_percent=int(input())
image_name=str(input())
im = Image.open('./target/'+image_name)
# Grab a single frame of video
if(image_name[image_name.index('.')+1:]=='png'):
    frame= im.convert('RGB')
else:
    frame = im
for i in range(0,4):
      if(True):
         print('prayag','10154')

    
#rows = zip(names,rollnos)
#with open('./client/src/result_csv.csv', "w",newline='') as f:
#   writer = csv.writer(f)
#    for row in rows:
#       writer.writerow(row)