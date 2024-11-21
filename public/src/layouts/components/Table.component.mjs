function Table(dataObjets, id = 'table', attrs = [], include = false, translate = {}) {

    let data = []

    if(attrs.length > 0) {
        dataObjets.forEach(dataObjet => {
            let obj = {}
            Object.keys(dataObjet).forEach(attr => {
                if(attrs.includes(attr) === include) {
                    obj[translate[attr] || attr] = dataObjet[attr]
                }
            })
            data.push(obj)
        })    
    }
    else {
        data = dataObjets
    }

    if (!Array.isArray(data) || data.length === 0) {
        return '<p style="padding: 0 20px 20px 20px;">No hay datos disponibles</p>';
    }

    const headers = Object.keys(data[0]);

    const encabezadosHTML = headers
        .map(header => `<th>${header}</th>`)
        .join("");

    const filasHTML = data
        .map(row => {
            const celdasHTML = headers
                .map(header => `<td>${row[header] ?? ''}</td>`)
                .join("");
            return `<tr class="tg-layout-table-row">${celdasHTML}</tr>`;
        })
        .join("");

    return `
        <table id="${id}" class="tg-layout-table" border='1'>
            <thead>
                <tr>${encabezadosHTML}</tr>
            </thead>
            <tbody>
                ${filasHTML}
            </tbody>
        </table>
    `;
}

export default Table;