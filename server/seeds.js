Meteor.startup(function() {

  var randomDate = function(){
    return new Date(new Date(2015, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2015, 0, 1).getTime()));
  };

  var topics = [
    {
      name: 'Rent',
      thumbnail: 'images/topics/rent.png'
    },
    {
      name: 'Buy/Sell',
      thumbnail: 'images/topics/buy_sell.png'
    },
    {
      name: 'Tenant',
      thumbnail: 'images/topics/tenants.png'
    },
    {
      name: 'Landlord',
      thumbnail: 'images/topics/landlords.png'
    },
    {
      name: 'Investor',
      thumbnail: 'images/topics/investors.png'
    },
    {
      name: 'Agent',
      thumbnail: 'images/topics/agents.png'
    }
  ];

  var posts = [


    /////////// Rent ///////////

    {
      topic: "Rent",
      title: "I need to find a place to rent. What do I do first?",
      answer: "Before you start searching for your new home it’s a good idea to write down a budget. What are your current outgoings and what money do you have left each month to spend on rent? Take into account that, when you first move in, you will need to front a deposit as well as the first month’s rent and tenancy set up fees."
    },
    {
      topic: "Rent",
      title: "I've found a place I want to rent. Now what?",
      answer: "If you haven’t already, make sure you go and view the property. If it’s a house-share, meet all the people you’ll be moving in with. The letting agent will ask you to sign a Tenancy Fee Declaration form which lists the services they will provide and the fees expected from you. The agent will then begin the referencing process to ensure you’re in a position to rent the property."
    },
    {
      topic: "Rent",
      title: "Why do I need to be referenced?",
      answer: "The landlord needs to be sure that that their tenant won’t have any problems paying the rent on a monthly basis and that the tenant will take good care of their property."
    },
    {
      topic: "Rent",
      title: "What does referencing involve?",
      answer: "Referencing is nothing to worry about. Tenants applying to rent need to give details of their employer and income, their previous address, and some bank account details. These will be checked to ensure they are able to commit to monthly rental payments."
    },
    {
      topic: "Rent",
      title: "Do I need to show ID?",
      answer: "As part of the referencing process we need to be sure a tenant is who they say they are. We will require a proof of residency (such as a utility or council tax bill from the last 3 months) and proof of ID (such as a passport or driving licence)."
    },
    {
      topic: "Rent",
      title: "What if there are problems with my reference?",
      answer: "In some circumstances, a tenant may not be approved immediately via referencing. Obvious examples are students without a regular income, or someone leaving their family home for the first time with no renting history. This is not uncommon, and there are still options for tenants in this position. They could pay the rent for the full term up front, or seek out a guarantor."
    },
    {
      topic: "Rent",
      title: "What is a guarantor?",
      answer: "If a tenant is not fully approved by the referencing process, they can ask a guarantor to support them. A guarantor (usually a parent or guardian) will agree to take joint responsibility for the rent for the property if the tenant fails to. Guarantors are required to pay any rent arrears (if the tenant does not pay) and for any damages costing more than the deposit."
    },
    {
      topic: "Rent",
      title: "What does a guarantor need to do?",
      answer: "A guarantor needs to go through the same referencing process as a tenant. The normal requirement is that they are employed and a UK resident, with sufficient earnings to cover the tenant’s rental commitment."
    },
    {
      topic: "Rent",
      title: "Why does my guarantor have to guarantee all tenants?",
      answer: "In the case of a house-share, the tenancy agreement makes all tenants jointly responsible for all rents and responsibilities. There is no individual ‘share’ of the rent written into the agreement. The guarantor therefore has the same responsibility."
    },
    {
      topic: "Rent",
      title: "Why do I have to pay a deposit?",
      answer: "The landlord trusts the tenant to keep the property in a good condition and in good order. The deposit is held to ensure that any damages (over and above fair wear and tear) can be corrected at the end of the tenancy."
    },

    /////////// Landlord ///////////

    {
      topic: "Landlord",
      title: "I want to let my property. Do I need to tell my mortgage lender?",
      answer: "Yes. Your mortgage lender needs to give you permission before you can let your property, and they may impose special conditions. If you are buying a property with the intention of letting it out, you may be able to obtain a buy to let mortgage."
    },
    {
      topic: "Landlord",
      title: "How do I know what rent to charge?",
      answer: "Ask a letting agent to value your home. At Your Move, we’re experts in the market, so we can tell you how other rental properties are doing in the area, and what kind of yield you can hope to expect."
    },
    {
      topic: "Landlord",
      title: "How much will it cost me to let my property?",
      answer: "This really depends on how much support you need. At Your Move we offer three main service levels: Tenant Find, Rent Collect and Fully Managed. Each involves a different degree of service from Your Move and the fees we charge reflect this. Be sure you understand an agent’s fees and exactly what you receive for your money when you ask them to conduct a lettings valuation."
    },
    {
      topic: "Landlord",
      title: "Why should I use a managing agent?",
      answer: "Choosing a fully managed service allows you to completely relax. You never have to worry about the let. It creates a professional distance between you and the tenancy, and means you can avoid having to deal with all the bad bits like rent arrears and deposit disputes."
    },
    {
      topic: "Landlord",
      title: "What happens to my tenant's deposit?",
      answer: "Landlords and letting agents are required to register tenants’ deposits with an approved Tenancy Deposit Scheme. At Your Move, we register deposits with a scheme such as My Deposits. The deposit is then either held by the landlord, the agent or the deposit scheme itself. The Tenancy Deposit Scheme is there to protect the tenant’s money and help to resolve any disputes at the end of the tenancy."
    },
    {
      topic: "Landlord",
      title: "Why should I have an inventory?",
      answer: "An inventory is a detailed list of the contents and condition of your property taken before the tenant moves in. It is important that if there is a dispute over damage at the end of the tenancy, you have proof of the original condition of the property and its contents."
    },
    {
      topic: "Landlord",
      title: "Why do I need an EPC?",
      answer: "An Energy Performance Certificate, or EPC for short, is a report detailing the energy efficiency of a property. It gives a property an energy efficiency rating from A (most efficient) to G (least efficient) and is valid for 10 years. All landlords are required to purchase an EPC for a property before they let it."
    },
    {
      topic: "Landlord",
      title: "What are my obligations surrounding gas?",
      answer: "A Gas Safety Record (GSR) is in place to ensure that all gas appliances, pipes and flues are in safe working order. It must be carried out by a qualified Gas Safe Register engineer. This needs to be checked every 12 months."
    },

    /////////// Buy/Sell ///////////


    {
      topic: "Buy/Sell",
      title: "I want to buy a property. What do I do first?",
      answer: "Before you start searching for a property, you need to work out how much the move is likely to cost and see what kind of mortgage deposit you can afford. Our professional Financial Consultants can help you calculate the costs involved in the house buying process."
    },
    {
      topic: "Buy/Sell",
      title: "I've found a property I love. What do I do now?",
      answer: "It is advisable to apply for a Decision in Principle from a mortgage lender and find a solicitor before you make an offer. Your Move can help you with both of these services. Just contact your local branch for more information."
    },
    {
      topic: "Buy/Sell",
      title: "How long will it take to complete my purchase?",
      answer: "Every purchase is different, and your position and the seller’s position needs to be taken into consideration before this question can be answered accurately. If the seller has already vacated the property and you have already secured a mortgage, exchange of contracts and completion can happen relatively quickly. However, if you need a mortgage and the seller is still in the property, the exchange of contracts normally takes between 4 and 6 weeks, the completion takes between 2 and 4 weeks. So in total you should expect up to 10 weeks to complete the purchase. Please note that in Scotland conclusion of missives normally takes between 6 and 8 weeks."
    },
    {
      topic: "Buy/Sell",
      title: "How much will conveyancing cost?",
      answer: "‘Conveyancing’ sounds like boring legal stuff, but it’s everything that needs to happen to make the property officially yours. It can be a confusing process and you need a solicitor to make it happen. Your Move can introduce you to a solicitor and offer a no sale no fee conveyancing service with a guaranteed fixed price to keep everything easy (this excludes disbursements). Contact your local branch to receive an accurate quote for how much this will cost."
    },
    {
      topic: "Buy/Sell",
      title: "When do I need to pay the deposit?",
      answer: "The deposit is paid to the seller’s solicitor, usually upon exchange of contracts. This is not applicable in Scotland."
    },
    {
      topic: "Buy/Sell",
      title: "When will my mortgage lender release the funds?",
      answer: "The mortgage will be requested from the lender by your solicitor. It usually takes around 4-5 working days for the lender to release the money being loaned. Your solicitor will take this time into account when advising you of the earliest possible completion date."
    },
    {
      topic: "Buy/Sell",
      title: "When do I sign the contract?",
      answer: "After the sale is agreed, the seller’s solicitor will draft a contract. Your solicitor will confirm the details of the property and perform searches. At the same time, your mortgage lender will need to conduct a mortgage valuation and send you a mortgage offer. Once all of this is complete, you will be ready to sign."
    }


  ];

  ///////////// Inserting Stuff /////////////
  
  Topics.remove({});
  if (Topics.find({}).count() === 0) {
    _(topics).each(function (topic) {
      Topics.insert(topic);
    });
  }

  Posts.remove({});
  if (Posts.find({}).count() === 0) {
    var randUser = Meteor.users.findOne();
    var randPic = 'http://pcimplements.com/koenigins/wp-content/uploads/2014/03/home.jpg';
    _(posts).each(function (post) {
      post.topicId = Topics.findOne({name: post.topic})._id;
      post.askedAt = randomDate();
      //post.askedBy = randUser._id;
      post.pic = randPic;
      Posts.insert(post);
    });
  }

});




