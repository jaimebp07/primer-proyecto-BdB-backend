const controller = {};

controller.list = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    req.getConnection((err, conn) => {
        conn.query('select * from customers_full_data;', (err, customers) => {
            if (err) {
                res.send('Error presentado en la recuperacion de los datos')
            }
            res.send(customers)
        })
    })
};

controller.addcustomer = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    let customer_names = req.body.customer_names;
    let customer_surnames = req.body.customer_surnames;
    let customer_place_of_birth = req.body.place_of_birth;
    let customer_day_of_birth = req.body.customer_day_of_birth;
    let customer_month_of_birth = req.body.customer_month_of_birth;
    let customer_year_of_birth = req.body.customer_year_of_birth;
    let monthly_income = req.body.monthly_income;
    let monthly_expense = req.body.monthly_expense;
    let active_spouse = req.body.active_spouse;
    let pasive_spouse = req.body.pasive_spouse;

    let createQuery = `insert into customers_full_data (customer_names, customer_surnames, place_of_birth, monthly_income, monthly_expense, active_spouse, pasive_spouse, date_of_birth) 
    values
    ('${customer_names}', '${customer_surnames}', '${customer_place_of_birth}', ${monthly_income}, ${monthly_expense}, ${active_spouse}, ${pasive_spouse}, STR_TO_DATE('${customer_day_of_birth}-${customer_month_of_birth}-${customer_year_of_birth}', '%d-%m-%Y'));`;

    req.getConnection((err, conn) => {
        if (err) {
            console.log('Error agregando al cliente, no se puede obtener la conexion!!')
        }
        conn.query(createQuery, (err, data) => {
            if (err) {
                res.send({ "message": "No se pudo insertar al cliente :(" })
            } else {
                res.send({ "message": "Cliente insertado :), ", data })
            }
        })
    })
}

module.exports = controller;