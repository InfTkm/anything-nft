const User = require("../models/user");
const Nft = require("../models/nft");
const Transaction = require("../models/transaction");
const Support = require("../models/support");

function logout(req, res, success, error) {
    try {
        req.session.username = null;
        success();
    } catch (e) {
        error("Error logging out.");
    }
}

const authUser = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ error: "invalid request" });
    }

    const address = req.body.address;
    const user = await User.findOne({ address });

    if (!!user) {
        onSuccessLogin();
    } else {
        onErrorLogin();
    }

    function onSuccessLogin() {
        req.session.username = address;
        req.session.loggedInCode = 5;
        res.json({ success: true });
    }

    function onErrorLogin() {
        res.json({ success: false, error: "Invalid address" });
    }
};

const getUser = async (req, res) => {
    if (!req.params.address) {
        return res.status(400).json({ error: "invalid request" });
    }

    const user = await User.findOne({ address: req.params.address });
    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }
    res.send(user);
};

const updateProfile = async (req, res) => {
    // if not exist, create one
    const user = await User.findOne({ address: req.body.address });
    if (!user) {
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            description: req.body.description,
            profile_picture:
                "https://bafybeiasgari2dccg4fcgrkbluberhlhmaq4noxhndz4ktn7pfdiakpp5m.ipfs.nftstorage.link/undraw_profile_pic_ic5t.png",
        });
        newUser.save((err) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.send("User profile created.");
        });
    } else {
        User.findOneAndUpdate(
            { address: req.body.address },
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address,
                description: req.body.description,
                profile_picture: req.body.profile_picture,
            },
            (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send("User profile updated.");
                }
            }
        );
    }
};

const getTransactions = async (req, res) => {
    if (!req.params.address) {
        return res.status(400).json({ error: "Invalid request" });
    }

    const transactions = await Transaction.find({ buyer: req.params.address });
    res.send(transactions);
};

const setAvatarToNft = async (req, res) => {
    // TODO: validate input, return status code correspondingly
    const url = (await Nft.findOne({ nft_id: req.body.nft_id })).file;
    await User.findOneAndUpdate({ address: req.body.address }, { profile_picture: url });
    res.status(200).send({ url });
};

const supportUser = async (req, res) => {
    new Support(req.body).save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send();
    });
};

module.exports = {
    authUser,
    getUser,
    updateProfile,
    getTransactions,
    setAvatarToNft,
    supportUser,
};
