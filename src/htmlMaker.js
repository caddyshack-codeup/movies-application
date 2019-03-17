module.exports = {
    makeHTML: (title, rating, id) => {
        let html = `<div class="col">`;
        html += `<h1>${title}</h1>`;
        html += `<h2>${rating}</h2>`;
        html += `<button class="editMovie" id="${id}">Edit</button>`;
        html += `<button class="deleteMovie" id="${id}">Delete</button>`;
        html += `</div>`;
        return html;
    }
};