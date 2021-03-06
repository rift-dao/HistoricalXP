import csv
import json
import time

def csvToJson(csvFilePath, jsonFilePath):
    jsonData = {}

    with open(csvFilePath, encoding = 'utf-8') as csvfile:  
        csvRead = csv.DictReader(csvfile)

        for rows in csvRead:
            key = rows['lootid']
            jsonData[key] = rows['xp']

    with open(jsonFilePath, 'w', encoding = 'utf-8') as jsonfile:
        jsonfile.write(json.dumps(jsonData, indent=4))

csvFilePath = r'riftdataXP032722.csv'
jsonFilePath = r'riftdataXP032722.json'

start = time.perf_counter()
csvToJson(csvFilePath, jsonFilePath)
finish = time.perf_counter()

print(f"Conversion completed successfully in {finish - start:0.4f} seconds")
