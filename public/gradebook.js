// gradebook.js

console.log("Gradebook script loaded");

function calculateFinalGrade(grades) {
    console.log("calculateFinalGrade for:", grades);
    if (!Array.isArray(grades) || grades.length === 0) return 0;
    let total = grades.reduce((sum,val) =>sum + parseFloat(val),0);
    return (total / grades.length).toFixed(2);
    // Placeholder for calculation logic;
}

function addStudentRow(name, grades) {
    console.log("Adding row for:", name, grades);
    const table =document.getElementById("gradebook");
    const row =document.createElement("tr");

    const nameCell =document.createElement("td");
    nameCell.textContent =name;
    row.appendChild(nameCell);

    grades.forEach(grade => {
        const gradeCell =document.createElement("td");
        gradeCell.textContent=grade;
        row.appendChild(gradeCell);

        table.appendChild(row);
    });
    }
    function populateGradebook(data) {
        console.log("Populating gradebook with:",data);
        data.forEach(student => {
            const name = `${student.last_name}, ${student.first_name}`;
            const grades = [
                student.assignment_1,
                student.assignment_2,
                student.assignment_3,
                student.assignment_4,
                ];
            addStudentRow(name, grades);
        });
    }
    function fetchGradeData() {
        console.log("Fetching grade data...");
        const xhr =new XMLHttpRequest();
        xhr.open("GET","/api/grades",true);

        xhr.onreadystatechange =function() {
            if (xhr.readyState ===XMLHttpRequest.DONE) {
                if (xhr.status ===200) {
                    const data =JSON.parse(xhr.responseText);
                    populateGradebook(data);
                } else {
                    console.error("Failed to fetch grades:",xhr.statusText);
                }
            }
        };
        xhr.send();
    }
    window.onload =fetchGradeData;
    // Placeholder for row-adding logic
}
