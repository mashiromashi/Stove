module.exports = function(app) {
    const village = require('../../controller/menu/controller.village')

    app.get('/village/getall', village.getAll)
    app.get('/village/getbyid/:id', village.getbyid);
    app.post('/village/addvillage', village.addvillage)

    app.post('/village/updatevillage', village.updateVillage)

    app.get('/village/deletevillage/:id', village.deleteVillage)
}