const express=require('express')
const app=express()
const fs=require("fs")
app.set('port', process.env.PORT | 3001)
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get('/web' , (req, res) => {
    res.render("index.html")
})
app.get('/table/:nom', async (req, res) => {
    const { nom } = req.params;
    data = [];
    await fs.unlink('public/lios.txt', function (err) {
        if (err && err.code == 'ENOENT') {
            
            console.info("File doesn't exist, won't remove it.");
            almacenarTabla(res, nom, data);
        } else if (err) {
           
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
            almacenarTabla(res, nom, data);
        }
    });
})

async function almacenarTabla(res, nom, data) {
    await fs.writeFileSync('public/lios.txt', `Tabla\nLa base usada es: ${nom}` + '\n', { flag: 'a' }, (err) => { })
    for (var i = 1; i <= 10; i++) {
        data[i - 1] = `${nom} * ${i} = ${nom * i}`;
        await fs.writeFileSync('public/lios.txt', data[i - 1] + '\n', { flag: 'a' }, (err) => { })

    }
    console.log(data)
    res.send({ data });
}

app.get('/table', (req, res) => {
    fs.readFile('public/lios.txt', 'utf8', (err, data) => {
        if (err) return console.log(err);
        if (data) return res.json(data.split('\n'));
    })
})
app.listen(app.get('port'), () => {
    console.log(`servidor corriendo http://localhost:${app.get('port')}`)
  })
