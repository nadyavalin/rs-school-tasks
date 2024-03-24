import { createText, createDiv } from "../components/elements";

const winnersContent = createDiv("winners-content");
const winnersText = createText("winners-text", `Winners ()`);
const pagesWinnersText = createText("pages", `Page #`);
winnersContent.append(winnersText, pagesWinnersText);

function crateTable() {
  const table = document.createElement("table");
  table.classList.add("winners-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.classList.add("head-row-table");
  const headers = ["Number", "Car", "Name", "Wins", "Best time (seconds)"];

  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.append(headerCell);
  });
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  for (let i = 0; i < 2; i += 1) {
    const row = document.createElement("tr");
    for (let j = 0; j < 5; j += 1) {
      const cell = document.createElement("td");
      cell.textContent = `Row ${i + 1}, Cell ${j + 1}`;
      cell.classList.add("cell-table");
      row.append(cell);
    }
    tbody.append(row);
  }
  table.append(tbody);
  winnersContent.append(table);
}
crateTable();

document.body.append(winnersContent);

export default winnersContent;
