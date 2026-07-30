const CryptoModel = require('../models/cryptoModel');
//We are adding the new crypto currency after checking there is no coin with the same name
exports.addCrypto = async (req, res) => {
    const { name } = req.body;
    try {
        // searching for the name
        const existingCrypto = await CryptoModel.findOne({ name });
        //if it exists 
        if (existingCrypto)
        return    res.status(400).json({
                message: 'CryptoCurrency with this name already exists'

            });

        const newCrypto = new CryptoModel({
            name,
        });
        await newCrypto.save();
      return   res.status(201).json({ message: 'Cryptocurrency succesfully added' })
    }
    catch (error) {
      
     return   res.status(500).json({ message: 'There is some error' });
    }
};

//Now this function is to get all the cryptocurrencies from the database

exports.getAllCoins = async (req, res) => {
    try {
        const allCryptos = await CryptoModel.find();
      return res.status(200).json(allCryptos);

    }
    catch (error) {
        // console.error(error);
     return   res.status(500).json({ message: 'There is some error' });
    }
}