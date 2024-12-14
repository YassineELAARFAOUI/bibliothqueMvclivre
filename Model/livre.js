const db = require('../config/db');

class Livre {
    static createTable(callback) {
        const sql = `
            CREATE TABLE IF NOT EXISTS livres (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                editeur VARCHAR(255) NOT NULL
            )
        `;
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Erreur lors de la création de la table 'livres':", err);
                callback(err);
            } else {
                console.log("Table 'livres' vérifiée ou créée avec succès.");
                callback(null, result);
            }
        });
    }

    static getAllLivres(callback) {
        const sql = 'SELECT * FROM livres';
        db.query(sql, (err, results) => {
            if (err) {
                console.error("Erreur lors de la récupération des livres:", err);
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static addLivre(livre, callback) {
        // Vérifier ou créer la table avant d'ajouter le livre
        this.createTable((err) => {
            if (err) {
                console.error("Erreur lors de la vérification/Création de la table:", err);
                callback(err, null);
            } else {
                const sql = 'INSERT INTO livres (title, author, editeur) VALUES (?, ?, ?)';
                db.query(sql, [livre.title, livre.author, livre.editeur], (err, result) => {
                    if (err) {
                        console.error("Erreur lors de l'ajout du livre:", err);
                        callback(err, null);
                    } else {
                        console.log("Livre ajouté avec succès:", livre);
                        callback(null, { id: result.insertId, ...livre });
                    }
                });
            }
        });
    }
}

module.exports = Livre;
