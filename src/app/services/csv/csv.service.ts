import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

constructor() { }
public importDataFromCSV(csvText: string): Array<any> {
  const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
  const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

  let dataArray: any[] = [];
  dataRows.forEach((row) => {
    let values = row.split(',');

    let obj: any = new Object();

    for (let index = 0; index < propertyNames.length; index++) {
      const propertyName: string = propertyNames[index];

      let val: any = values[index];
      if (val === '') {
        val = null;
      }

      obj[propertyName] = val;
    }

    dataArray.push(obj);
  });

  return dataArray;
}

public importDataFromCSVByType(csvText: string, obj: any): Array<any> {
  const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(';');
  const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
  console.log(dataRows.pop())
  console.log(propertyNames)
  console.log(dataRows)
  let dataArray: any[] = [];
  dataRows.forEach((row) => {
   
    let values = row.split(';');
    console.log(values)
    let dataObj: any = new Object();
    for (let index = 0; index < propertyNames.length; index++) {
      const propertyName: string = propertyNames[index];

      let value: any = values[index];
      if (value === '') {
        value = null;
      }
      console.log(value)


      if (typeof obj[propertyName] === 'undefined') {
        dataObj[propertyName] = undefined;
      } 
      else if (typeof obj[propertyName] === 'boolean') {
        
        dataObj[propertyName] = value.toLowerCase() === 'true';
      } 
      else if (typeof obj[propertyName] === 'number') {
        dataObj[propertyName] = Number(value);
      } 
      else if (typeof obj[propertyName] === 'string') {
        dataObj[propertyName] = value;
      }
      else if (typeof obj[propertyName] === 'object') {
        console.error("do no have algorithm to convert object");
      }
    }

    dataArray.push(dataObj);
  });

  return dataArray;
}
}
