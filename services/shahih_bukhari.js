const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function get(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM shahih_bukhari LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(shahih_bukhari) {
  const result = await db.query(
    `INSERT INTO shahih_bukhari 
    (kitab, arab, terjemah) 
    VALUES 
    (${shahih_bukhari.kitab}, ${shahih_bukhari.arab}, ${shahih_bukhari.terjemah}`
  );

  let message = "Error in creating Shahih Bukhari ";

  if (result.affectedRows) {
    message = "Shahih Bukhari  created successfully";
  }

  return { message };
}

async function update(id, shahih_bukhari) {
  const result = await db.query(
    `UPDATE shahih_bukhari 
    SET kitab="${shahih_bukhari.kitab}", arab=${shahih_bukhari.arab}, terjemah=${shahih_bukhari.terjemah}
    WHERE id=${id}`
  );

  let message = "Error in updating Shahih Bukhari";

  if (result.affectedRows) {
    message = "Shahih Bukhari updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM shahih_bukhari WHERE id=${id}`);

  let message = "Error in deleting Shahih Bukhari";

  if (result.affectedRows) {
    message = "Shahih Bukhari deleted successfully";
  }

  return { message };
}

module.exports = {
  get,
  create,
  update,
  remove,
};