export function audits(ratio, up, down) {
    const auditPieChart = document.getElementById("audit-chart");
    const svgNS = "http://www.w3.org/2000/svg";

    // Necessary variables. Calculate circumference, the percentega of the
    // audits received compared to total and the
    const circumference = 628;
    const total = up + down;
    const percentage = (down / total) * 100;
    const strokeDashNumber = (circumference / 100) * percentage;

    // Create the pie.
    const pie = document.createElementNS(svgNS, "circle");
    pie.classList.add("pie");
    pie.setAttributeNS(null, "cx", 100);
    pie.setAttributeNS(null, "cy", 100);
    pie.setAttributeNS(null, "r", 100);
    pie.style.strokeDasharray = 0 + " " + circumference;

    // Make the colored section.
    pie.style.strokeDasharray = `${strokeDashNumber}, ${circumference}`;

    // Append.
    auditPieChart.appendChild(pie);
}