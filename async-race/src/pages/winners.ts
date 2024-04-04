import { createText, createDiv } from "../components/elements";
import { getWinners, getCarsPerPage, getWinner } from "../api/api";
import { svgCarElement } from "../components/svgElements";

export const winnersContent = createDiv("winners-content");

async function getWinnersTable() {
  const winnersPerPage = await getWinner(1);
  const winnersText = createText(
    "winners-text",
    `Winners (${winnersPerPage.id})`,
  );
  const pagesWinnersText = createText("pages", `Page #1`);
  winnersContent.append(winnersText, pagesWinnersText);
}
getWinnersTable();

const svgCar = createDiv("car");
svgCar.classList.add("car_small");
svgCar.innerHTML = svgCarElement;
export async function createWinnersTable(): Promise<HTMLDivElement> {
  const winners = await getWinners();
  const { cars } = await getCarsPerPage();
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
  for (let i = 0; i < winners.length; i += 1) {
    const row = document.createElement("tr");
    const cellNumber = document.createElement("td");
    cellNumber.textContent = `${i + 1}`;
    const cellCar = document.createElement("td");
    cellCar.append(svgCar);
    svgCar.style.setProperty("--svg-fill-color", cars[i].color);
    const cellName = document.createElement("td");
    cellName.textContent = cars[i].name;
    const cellWins = document.createElement("td");
    cellWins.textContent = winners[i].wins;
    const cellTime = document.createElement("td");
    cellTime.textContent = winners[i].time;

    cellNumber.classList.add("cell-table");
    cellCar.classList.add("cell-table");
    cellName.classList.add("cell-table");
    cellWins.classList.add("cell-table");
    cellTime.classList.add("cell-table");

    row.append(cellNumber, cellCar, cellName, cellWins, cellTime);
    tbody.append(row);
  }
  table.append(tbody);
  winnersContent.append(table);
  return winnersContent;
}
