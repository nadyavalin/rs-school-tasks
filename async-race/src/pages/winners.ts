import { createText, createDiv } from "../components/elements";
import { getWinners, getCars, getWinnersPerPage } from "../api/api";

const winnersContent = createDiv("winners-content");
const winnersPerPage = await getWinnersPerPage(1);
const winnersText = createText(
  "winners-text",
  `Winners (${winnersPerPage.id})`,
);
const pagesWinnersText = createText("pages", `Page #1`);

winnersContent.append(winnersText, pagesWinnersText);

const svgCar = createDiv("car");
svgCar.classList.add("car_small");
svgCar.innerHTML = `
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="30px" height="30px" viewBox="0 0 492.626 492.626"
	 xml:space="preserve">
<g>
	<g>
		<path d="M473.86,230.235l-3.943-11.445h-2.797c-7.566,0-20.27-3.228-33.723-6.645c-16.606-4.224-35.43-8.997-50.293-9.199
			c-10.856-0.15-31.438-10.81-53.227-22.099c-28.549-14.792-60.909-31.551-84.204-31.551h-89.62
			c-15.513,0-23.253,1.878-30.735,3.691c-5.47,1.318-10.638,2.572-18.935,3.164c-13.425,0.95-23.245,5.158-28.849,8.248
			c1.1-4.384-1.256-10.119-7.184-10.69c-18.142-1.751-35.836-2.855-51.483-13.157c-8.485-5.592-16.336,8.017-7.918,13.56
			c7.827,5.147,16.164,8.271,24.78,10.391h-1.16l11.353,15.252c-3.212,1.655-6.179,3.274-8.439,4.719
			c-1.709,1.1-2.906,1.595-3.874,1.993c-5.947,2.499-5.947,2.499-25.026,42.104c-17.544,36.426-4.144,59.677,4.524,69.719
			c0.181-1.739,0.449-3.446,0.786-5.125c0.345-1.72,0.777-3.406,1.28-5.069c7.007-23.487,28.788-40.678,54.519-40.678
			c31.386,0,56.916,25.529,56.916,56.915c0,1.712-0.112,3.395-0.26,5.066c-0.116,1.322-0.315,2.608-0.519,3.895
			c-0.21,1.318-0.447,2.629-0.744,3.92c47.785,0.389,157.906,1.326,235.222,2.252c-0.36-1.295-0.729-2.598-0.989-3.939
			c-0.261-1.278-0.438-2.605-0.605-3.932c-0.309-2.384-0.521-4.801-0.521-7.27c0-31.386,25.527-56.915,56.913-56.915
			c31.387,0,56.918,25.529,56.918,56.915c0,3.021-0.309,5.963-0.762,8.869c-0.213,1.342-0.445,2.668-0.75,3.979
			c-0.316,1.351-0.621,2.693-1.037,3.988c9.577-0.497,15.765-2.385,19.336-8.088c3.826-6.127,3.818-15.332,3.818-32.047V279.6
			C492.634,243.409,479.234,232.968,473.86,230.235z M68.465,169.222c-1.491,0.651-3.194,1.395-5.164,2.276l-2.23-2.997
			C63.528,168.75,65.992,168.983,68.465,169.222z"/>
		<path d="M69.699,353.397c22.658,0,41.678-15.377,47.312-36.251c0.347-1.291,0.661-2.593,0.906-3.92
			c0.234-1.286,0.457-2.568,0.593-3.887c0.167-1.647,0.255-3.318,0.255-5.006c0-27.102-21.965-49.066-49.065-49.066
			c-24.181,0-44.22,17.504-48.271,40.52c-0.276,1.547-0.471,3.121-0.599,4.708c-0.099,1.271-0.194,2.545-0.194,3.839
			c0,0.137,0.014,0.261,0.022,0.394C20.86,331.64,42.733,353.397,69.699,353.397z"/>
		<path d="M368.493,319.583c6.408,19.624,24.846,33.814,46.618,33.814c21.119,0,39.076-13.369,45.989-32.083
			c0.478-1.287,0.906-2.59,1.274-3.924c0.353-1.29,0.674-2.585,0.926-3.911c0.553-2.966,0.882-6.02,0.882-9.146
			c0-27.102-21.961-49.066-49.063-49.066c-27.102,0-49.066,21.965-49.066,49.066c0,2.514,0.257,4.962,0.617,7.374
			c0.204,1.326,0.437,2.637,0.741,3.936C367.719,316.969,368.064,318.288,368.493,319.583z"/>
	</g>
</g>
</svg>`;
async function createWinnersTable() {
  const winners = await getWinners();
  const cars = await getCars();
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
}
createWinnersTable();

document.body.append(winnersContent);

export default winnersContent;
