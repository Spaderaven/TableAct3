let averages = [];
let averageState = 0;
let assignmentAmount = 5;
let unsubmited = 30;

let grades = [
    {
        studentName: "",
        studentID: "",
        grades: [' - ', ' - ', ' - ', ' - ', ' - '],
        average: 0
    },
    {
        studentName: "",
        studentID: "",
        grades: [' - ', ' - ', ' - ', ' - ', ' - '],
        average: 0
    },
    {
        studentName: "",
        studentID: "",
        grades: [' - ', ' - ', ' - ', ' - ', ' - '],
        average: 0
    },
    {
        studentName: "",
        studentID: "",
        grades: [' - ', ' - ', ' - ', ' - ', ' - '],
        average: 0
    },
    {
        studentName: "",
        studentID: "",
        grades: [' - ', ' - ', ' - ', ' - ', ' - '],
        average: 0
    },
]

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function UpdateGrades(row) {
    console.log("hello");
    console.log( "ROOEOEOE", row);
    console.log("PARENT", row.rowIndex);
    let average = 0;
    let assignmnetIsMissing = false;
    let unFinished = assignmentAmount;

    grades[row.rowIndex-1].studentName = row.children[0].innerHTML
    grades[row.rowIndex-1].studentID = row.children[1].innerHTML

    for (let i = 2; i <= assignmentAmount+1; i++) {

        data = row.children[i].innerHTML

        console.log("DATA", data);

        if(data == " - " || isEmptyOrSpaces(data) ){
            console.log("ES RAYA");
            assignmnetIsMissing = true;
            unFinished--;
            grades[row.rowIndex-1].grades[i-2] = data;
            continue
        }
        
        data = parseInt(data);
        console.log("DATA", data);
        if(Number.isInteger(data) && data <= 100 && data >= 0){
            console.log("SI ES NUMERO", data);
            row.children[i].style.backgroundColor = 'transparent';
            average = average + data;
        } 
        else {
            console.log("Ta cabron");
            row.children[i].innerHTML = " - "
            row.children[i].style.backgroundColor = 'yellow';
            assignmnetIsMissing = true;
            unFinished--;
            data = " - ";
        }

        grades[row.rowIndex-1].grades[i-2] = data;

    }

    console.log(grades);

    if(!assignmnetIsMissing) {
        average = average / assignmentAmount;
        average = Math.round(average)
        grades[row.rowIndex-1].average = average;
        console.log("CALCULANDO", average, TransfromToLetter(average), TransfromToScale(average));
        row.children[row.children.length-1].innerHTML = average

        if(average < 60) {
            row.children[row.children.length-1].style.backgroundColor = 'red';
            row.children[row.children.length-1].style.color = 'white';
        }
        else {
            row.children[row.children.length-1].style.backgroundColor = 'transparent';
            row.children[row.children.length-1].style.color = 'black';
        }

    }
    else{
        row.children[row.children.length-1].innerHTML = 0;
        row.children[row.children.length-1].style.backgroundColor = 'transparent';
        row.children[row.children.length-1].style.color = 'black';
    }

    CountUnSubs();

}

function CountUnSubs() {

    let unsubs = 0;

    grades.forEach(student => {
        
        student.grades.forEach(grade => {
            if(!Number.isInteger(grade))
            unsubs++;
        });

    });

    document.getElementById("unSubmited").innerHTML = unsubs;
}


function ChangeAverageState(){
    averageState++;

    let table = document.getElementById("gradeTable").children[0];


    if(averageState == 3) averageState = 0;

    if(averageState == 0) {
        
        for (const row of table.children) {
            
            if(row.children[0].tagName == "TH")
            {
                console.log(row.children);
                row.children[assignmentAmount+2].innerHTML = "Average %"
                continue;
            } 

            row.children[assignmentAmount+2].innerHTML = grades[row.rowIndex - 1].average;


    
        }
    }
    else if(averageState == 1) {

        for (const row of table.children) {
            
            if(row.children[0].tagName == "TH")
            {
                console.log(row.children);
                row.children[assignmentAmount+2].innerHTML = "Average Letter"
                continue;
            } 
            row.children[assignmentAmount+2].innerHTML = TransfromToLetter(grades[row.rowIndex - 1].average);    
        }
    }
    else if(averageState == 2) {

        for (const row of table.children) {
            
            if(row.children[0].tagName == "TH")
            {
                console.log(row.children);
                row.children[assignmentAmount+2].innerHTML = "Average 4.0"
                continue;
            } 

            row.children[assignmentAmount+2].innerHTML = TransfromToScale(grades[row.rowIndex - 1].average);    
        }
    }

    console.log(table);

    
}


function AddRow() {

    grades.push({
        studentName: "-",
        studentID: "-",
        grades: [' - ', ' - ', ' - ', ' - ', ' - '],
        average: 0
    })

    var table = document.getElementById("gradeTable");

    var row = table.insertRow(-1);

    for (let i = 0; i <= assignmentAmount+2; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = "-";
        cell.contentEditable = "true";
        console.log(cell);
    }
    
    row.children[assignmentAmount+2].innerHTML = "0"
    row.children[assignmentAmount+2].contentEditable = "false";
    row.onkeyup="UpdateGrades(this)";

    row.addEventListener("onkeyup", UpdateGrades); 

    CountUnSubs();

}


function AddColumn() {

    assignmentAmount++;

    var table = document.getElementById("gradeTable");

    for (const row of table.children[0].children) {

        if(row.children[0].tagName == "TH")
        {

            var newTH = document.createElement('th');
            row.insertBefore(newTH, row.children[row.children.length-1]);
            newTH.innerHTML = "Assignment " + assignmentAmount;

            continue;
        } 

        let cell = row.insertCell(row.children.length-1);

        cell.innerHTML = " - ";
        cell.contentEditable = "true";
        console.log(cell);
    }

    grades.forEach(student => {
        student.grades.push(" - ")
    });

    CountUnSubs();

}


function TransfromToLetter(num) {
    switch (true) {
        case (num >= 93 && num <= 100):
            return 'A'
        case (num >= 90 && num <= 92):
            return 'A-'
        case (num >= 87 && num <= 89):
            return 'B+'
        case (num >= 83 && num <= 86):
            return 'B'
        case (num >= 80 && num <= 82):
            return 'B-'
        case (num >= 77 && num <= 79):
            return 'C+'
        case (num >= 73 && num <= 76):
            return 'C'
        case (num >= 70 && num <= 72):
            return 'C-'
        case (num >= 67 && num <= 69):
            return 'D+'
        case (num >= 63 && num <= 66):
            return 'D'
        case (num >= 60 && num <= 62):
            return 'D-'
        case (num < 60):
            return 'F'
    }
}


function TransfromToScale(num) {
    switch (true) {
        case (num >= 93 && num <= 100):
            return '4.0'
        case (num >= 90 && num <= 92):
            return '3.7'
        case (num >= 87 && num <= 89):
            return '3.3'
        case (num >= 83 && num <= 86):
            return '3.0'
        case (num >= 80 && num <= 82):
            return '2.7'
        case (num >= 77 && num <= 79):
            return '2.3'
        case (num >= 73 && num <= 76):
            return '2.0'
        case (num >= 70 && num <= 72):
            return '1.7'
        case (num >= 67 && num <= 69):
            return '1.3'
        case (num >= 63 && num <= 66):
            return '1.0'
        case (num >= 60 && num <= 62):
            return '0.7'
        case (num < 60):
            return '0.0'
    }
}

AddRow();
AddColumn();