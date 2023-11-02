const Favorites = require('../models/Favorites');

module.exports = {
    index: async (req, res) => {
        try {
            const favorites = await Favorites.find().exec();
            return res.json(favorites);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            return res.status(500).json({ status: false, message: 'Error fetching favorites' });
        }
    },

    store: async (req, res) => {
        const { user, place } = req.body;
    
        try {
            const favorite = new Favorites({ user, place });
            await favorite.save();
    
            return res.json({ status: true, message: 'Favorite saved successfully' });
        } catch (error) {
            console.error('Error saving favorite:', error);
            return res.status(500).json({ status: false, message: 'Error saving favorite' });
        }
    },

    destroy: (req, res) => {
        const favorite = Favorites.findByIdAndRemove(req.params.id);

        if (!favorite) {
            return res.status(400).send({ error: 'Favorito não encontrado' });
        }

        return res.send();
    },

    find: (req, res) => {
        Favorites.find({ user: userId })
            .populate('place') 
            .exec()
            .then(userFavorites => {
                res.json(userFavorites);
            }).catch(error => {
               res.send(error);
            });
    }

};

