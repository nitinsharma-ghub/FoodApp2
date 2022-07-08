let SK = 'sk_test_51LDTrSSG7xngw13KkU0kIiFIcoDKTjcYuX2bvW2gzLzSt7R493eIPnLNTN7QRF7IChI6RHRyG7KLkyjwZXSylD0h00eEVwJ3NB';
const stripe = require("stripe")(SK);
const planModel = require("../Model/planModel");
const userModel = require("../Model/userModel");

module.exports.createBooking = async function createBooking(req,res){
    try{
        let planId = req.params.id;
        let userId = req.body.id;
        let plan = await planModel.findById(planId);
        let user = await userModel.findById(userId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            client_reference_id: plan.id,
            line_items: [
                {
                    name: plan.name,
                    description: plan.description,
                    amount: plan.price,
                    currency: "inr",
                    quantity: 1
                }
            ],
            success_url : `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get('host')}/cancel`
        });
        res.json({
            status: "Success",
            session
        });
    }
    catch(err){
        res.json({
            message: err.message
        });
    }
}

module.exports.getPage = function getPage(req,res){
    res.sendFile("booking.html", {root:__dirname});
}