function fileRead() {

  let fileInput = document.getElementById("csv-file");
  let tableBody = document.getElementById("table-body");
  let file = fileInput.files[0];

  if (!file) {
    tableBody.innerHTML = "<tr><td colspan='4'>Please select a CSV file to upload.</td></tr>";
    return;
  }
  
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    let output = readCsv(reader.result);
    let tableRows = "";
    for (let i = 0; i < output.length; i++) {
      let [emp1, emp2, project, days] = output[i].split(',');
      tableRows += `<tr><td>${emp1}</td><td>${emp2}</td><td>${project}</td><td>${days}</td></tr>`;
    }
    tableBody.innerHTML = tableRows;
  };
  reader.onerror = function () {
    tableBody.innerHTML = "<tr><td colspan='4'>Unable to read the file.</td></tr>";
  };
}

function readCsv(csv) {
  let pairs = {};

  const lines = csv.trim().split('\n');

  const data = lines.map(line => {
    const [EmpID, ProjectID, DateFrom, DateTo] = line.split(',').map(item => item.trim());
    const dateFrom = new Date(DateFrom);
    let dateTo = 0;
    if (DateTo !== ('NULL' || 'null' || '')) {
      dateTo = new Date(DateTo);
    } else {
      dateTo = new Date();
    }


    return { EmpID, ProjectID, DateFrom: dateFrom, DateTo: dateTo };
  });

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[i].ProjectID === data[j].ProjectID) {
        const daysWorked = Math.floor((data[i].DateTo - data[i].DateFrom) / (1000 * 60 * 60 * 24));
        const key = `${data[i].EmpID}-${data[j].EmpID}-${data[i].ProjectID}`;
        if (key in pairs) {
          pairs[key].days += daysWorked;
        } else {
          pairs[key] = {
            emp1: data[i].EmpID,
            emp2: data[j].EmpID,
            project: data[i].ProjectID,
            days: daysWorked
          };
        }
      }
    }
  }

  let winningPair = null;
  let maxDays = 0;

  for (const key in pairs) {
    const pair = pairs[key];
    if (pair.days > maxDays) {
      winningPair = pair;
      maxDays = pair.days;
    }
  }

  const output = [];
  for (const key in pairs) {
    const pair = pairs[key];
    if (pair.emp1 === winningPair.emp1 && pair.emp2 === winningPair.emp2) {
      output.push(`${pair.emp1}, ${pair.emp2}, ${pair.project}, ${pair.days}`);
    }
  }

  return output;
}
