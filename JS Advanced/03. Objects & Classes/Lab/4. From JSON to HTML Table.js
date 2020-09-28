function JSONToHTMLTable(input) {
    let jsonData = input.shift();
    let students = JSON.parse(jsonData);

    let first = students[0];

    let html = '<table>';

    html += `<tr>${Object.keys(first).map(x => `<th>${x}</th>`).join('')}</tr>`;
    students.forEach(student => {
        html += '<tr>';
        html += Object.values(student).map(x => `<td>${x}</td>`).join('');
        html += '</tr>';
    });
    html += '</table>'

    console.log(html);
}