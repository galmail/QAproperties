Meteor.startup(function() {

  var randomDate = function(){
    return new Date(new Date(2015, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2015, 0, 1).getTime()));
  };

  var topics = [
    {
      name: 'Rent',
      thumbnail: 'images/topics/rent.png',
      position: 1
    },
    {
      name: 'Buy/Sell',
      thumbnail: 'images/topics/buy_sell.png',
      position: 2
    },
    {
      name: 'Tenant',
      thumbnail: 'images/topics/tenants.png',
      position: 3
    },
    {
      name: 'Landlord',
      thumbnail: 'images/topics/landlords.png',
      position: 4
    },
    {
      name: 'Investor',
      thumbnail: 'images/topics/investors.png',
      position: 5
    },
    {
      name: 'Agent',
      thumbnail: 'images/topics/agents.png',
      position: 6
    }
  ];

  var posts = [


    /////////// Rent ///////////

    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "I need to find a place to rent. What do I do first?",
      answer: "Before you start searching for your new home it’s a good idea to write down a budget. What are your current outgoings and what money do you have left each month to spend on rent? Take into account that, when you first move in, you will need to front a deposit as well as the first month’s rent and tenancy set up fees."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "I've found a place I want to rent. Now what?",
      answer: "If you haven’t already, make sure you go and view the property. If it’s a house-share, meet all the people you’ll be moving in with. The letting agent will ask you to sign a Tenancy Fee Declaration form which lists the services they will provide and the fees expected from you. The agent will then begin the referencing process to ensure you’re in a position to rent the property."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "Why do I need to be referenced?",
      answer: "The landlord needs to be sure that that their tenant won’t have any problems paying the rent on a monthly basis and that the tenant will take good care of their property."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "What does referencing involve?",
      answer: "Referencing is nothing to worry about. Tenants applying to rent need to give details of their employer and income, their previous address, and some bank account details. These will be checked to ensure they are able to commit to monthly rental payments."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "Do I need to show ID?",
      answer: "As part of the referencing process we need to be sure a tenant is who they say they are. We will require a proof of residency (such as a utility or council tax bill from the last 3 months) and proof of ID (such as a passport or driving licence)."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "What if there are problems with my reference?",
      answer: "In some circumstances, a tenant may not be approved immediately via referencing. Obvious examples are students without a regular income, or someone leaving their family home for the first time with no renting history. This is not uncommon, and there are still options for tenants in this position. They could pay the rent for the full term up front, or seek out a guarantor."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "What is a guarantor?",
      answer: "If a tenant is not fully approved by the referencing process, they can ask a guarantor to support them. A guarantor (usually a parent or guardian) will agree to take joint responsibility for the rent for the property if the tenant fails to. Guarantors are required to pay any rent arrears (if the tenant does not pay) and for any damages costing more than the deposit."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "What does a guarantor need to do?",
      answer: "A guarantor needs to go through the same referencing process as a tenant. The normal requirement is that they are employed and a UK resident, with sufficient earnings to cover the tenant’s rental commitment."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "Why does my guarantor have to guarantee all tenants?",
      answer: "In the case of a house-share, the tenancy agreement makes all tenants jointly responsible for all rents and responsibilities. There is no individual ‘share’ of the rent written into the agreement. The guarantor therefore has the same responsibility."
    },
    {
      topic: "Rent",
      askedByUser: "Your Move",
      title: "Why do I have to pay a deposit?",
      answer: "The landlord trusts the tenant to keep the property in a good condition and in good order. The deposit is held to ensure that any damages (over and above fair wear and tear) can be corrected at the end of the tenancy."
    },

    /////////// Buy/Sell ///////////


    {
      topic: "Buy/Sell",
      askedByUser: "Your Move",
      title: "I want to buy a property. What do I do first?",
      answer: "Before you start searching for a property, you need to work out how much the move is likely to cost and see what kind of mortgage deposit you can afford. Our professional Financial Consultants can help you calculate the costs involved in the house buying process."
    },
    {
      topic: "Buy/Sell",
      askedByUser: "Your Move",
      title: "I've found a property I love. What do I do now?",
      answer: "It is advisable to apply for a Decision in Principle from a mortgage lender and find a solicitor before you make an offer. Your Move can help you with both of these services. Just contact your local branch for more information."
    },
    {
      topic: "Buy/Sell",
      askedByUser: "Your Move",
      title: "How long will it take to complete my purchase?",
      answer: "Every purchase is different, and your position and the seller’s position needs to be taken into consideration before this question can be answered accurately. If the seller has already vacated the property and you have already secured a mortgage, exchange of contracts and completion can happen relatively quickly. However, if you need a mortgage and the seller is still in the property, the exchange of contracts normally takes between 4 and 6 weeks, the completion takes between 2 and 4 weeks. So in total you should expect up to 10 weeks to complete the purchase. Please note that in Scotland conclusion of missives normally takes between 6 and 8 weeks."
    },
    {
      topic: "Buy/Sell",
      askedByUser: "Your Move",
      title: "How much will conveyancing cost?",
      answer: "‘Conveyancing’ sounds like boring legal stuff, but it’s everything that needs to happen to make the property officially yours. It can be a confusing process and you need a solicitor to make it happen. Your Move can introduce you to a solicitor and offer a no sale no fee conveyancing service with a guaranteed fixed price to keep everything easy (this excludes disbursements). Contact your local branch to receive an accurate quote for how much this will cost."
    },
    {
      topic: "Buy/Sell",
      askedByUser: "Your Move",
      title: "When do I need to pay the deposit?",
      answer: "The deposit is paid to the seller’s solicitor, usually upon exchange of contracts. This is not applicable in Scotland."
    },
    {
      topic: "Buy/Sell",
      askedByUser: "Your Move",
      title: "When will my mortgage lender release the funds?",
      answer: "The mortgage will be requested from the lender by your solicitor. It usually takes around 4-5 working days for the lender to release the money being loaned. Your solicitor will take this time into account when advising you of the earliest possible completion date."
    },
    {
      topic: "Buy/Sell",
      askedByUser: "Your Move",
      title: "When do I sign the contract?",
      answer: "After the sale is agreed, the seller’s solicitor will draft a contract. Your solicitor will confirm the details of the property and perform searches. At the same time, your mortgage lender will need to conduct a mortgage valuation and send you a mortgage offer. Once all of this is complete, you will be ready to sign."
    },

    /////////// Landlord ///////////

    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "I want to let my property. Do I need to tell my mortgage lender?",
      answer: "Yes. Your mortgage lender needs to give you permission before you can let your property, and they may impose special conditions. If you are buying a property with the intention of letting it out, you may be able to obtain a buy to let mortgage."
    },
    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "How do I know what rent to charge?",
      answer: "Ask a letting agent to value your home. At Your Move, we’re experts in the market, so we can tell you how other rental properties are doing in the area, and what kind of yield you can hope to expect."
    },
    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "How much will it cost me to let my property?",
      answer: "This really depends on how much support you need. At Your Move we offer three main service levels: Tenant Find, Rent Collect and Fully Managed. Each involves a different degree of service from Your Move and the fees we charge reflect this. Be sure you understand an agent’s fees and exactly what you receive for your money when you ask them to conduct a lettings valuation."
    },
    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "Why should I use a managing agent?",
      answer: "Choosing a fully managed service allows you to completely relax. You never have to worry about the let. It creates a professional distance between you and the tenancy, and means you can avoid having to deal with all the bad bits like rent arrears and deposit disputes."
    },
    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "What happens to my tenant's deposit?",
      answer: "Landlords and letting agents are required to register tenants’ deposits with an approved Tenancy Deposit Scheme. At Your Move, we register deposits with a scheme such as My Deposits. The deposit is then either held by the landlord, the agent or the deposit scheme itself. The Tenancy Deposit Scheme is there to protect the tenant’s money and help to resolve any disputes at the end of the tenancy."
    },
    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "Why should I have an inventory?",
      answer: "An inventory is a detailed list of the contents and condition of your property taken before the tenant moves in. It is important that if there is a dispute over damage at the end of the tenancy, you have proof of the original condition of the property and its contents."
    },
    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "Why do I need an EPC?",
      answer: "An Energy Performance Certificate, or EPC for short, is a report detailing the energy efficiency of a property. It gives a property an energy efficiency rating from A (most efficient) to G (least efficient) and is valid for 10 years. All landlords are required to purchase an EPC for a property before they let it."
    },
    {
      topic: "Landlord",
      askedByUser: "Your Move",
      title: "What are my obligations surrounding gas?",
      answer: "A Gas Safety Record (GSR) is in place to ensure that all gas appliances, pipes and flues are in safe working order. It must be carried out by a qualified Gas Safe Register engineer. This needs to be checked every 12 months."
    },

    /////////// Tenant ///////////

    {
      topic: "Tenant",
      askedByUser: "Paul Lee & Co.",
      title: "Why do I have to pay fees to the Letting Agent?",
      answer: "A Tenancy Administration fee is a charge to Tenants by Letting Agents to include the cost of referencing - a credit check by a professional tenant referencing service to assess a potential Tenant, the provision of the tenancy agreement, associated tenancy documents and the protection of the tenancy deposit with the TDS – Tenancy Deposit Scheme."
    },
    {
      topic: "Tenant",
      askedByUser: "Paul Lee & Co.",
      title: "What does Registered Applicant mean?",
      answer: "It means you have given the Letting Agent your contact details, property requirements, rental budget and tenancy period, so they can find you your new home."
    },
    {
      topic: "Tenant",
      askedByUser: "Paul Lee & Co.",
      title: "Why do I need to provide references and proof of identity?",
      answer: "This is so the Letting Agent by conducting a credit check through a professional tenant referencing service can prove to the Landlord that your income/financial situation is adequate to meet your rental obligations. The referencing company will contact your employers/accountants and your current/previous Landlord. Proof of your identity is a legal requirement under the money laundering regulations. You will be asked to provide the Letting Agents with copies of photo ID (passport, national identity card or driving licence) and a proof of address (bank statement or utility bill)."
    },
    {
      topic: "Tenant",
      askedByUser: "Paul Lee & Co.",
      title: "What is a Tenancy Agreement?",
      answer: "This is the legally binding document that details the agreed terms and conditions of letting of the property between the Landlord and the Tenant. The tenancy agreement is a comprehensive document that lists the Landlords and the Tenants details, the rent, when the rent is due, the start and end dates, the deposit amount and the Landlords and Tenants obligations, responsibilities and rights."
    },
    {
      topic: "Tenant",
      askedByUser: "Paul Lee & Co.",
      title: "Who holds my deposit?",
      answer: "This will depend on the type of tenancy; the Letting Agent will advise you in writing when the terms of the letting are agreed, this will also be stated in the tenancy agreement. If the tenancy is an Assured Shorthold Tenancy (AST) the most common form of tenancy in the England and Wales. Then Tenants deposit will be subject to the Tenancy Deposit Protection Scheme (TDPS). This is a government approved scheme that requires by law that the Tenants deposit to be protected by one of the two insurance based schemes or the custodial scheme. The Landlord can hold the deposit or pass it on to the custodial scheme, as long as it is registered with the TDPS. If the Letting Agent as Stakeholder is asked to hold the tenancy deposit in their Client’s bank account it will be registered with the TDS."
    },
    {
      topic: "Tenant",
      askedByUser: "Paul Lee & Co.",
      title: "Can I leave the property before the tenancy ends?",
      answer: "Yes, the Letting Agent will negotiate this as part of the agreed terms of the tenancy. It can be agreed with the Landlord that you can have a break clause written into the tenancy agreement. A break clause allows either the Tenant or the Landlord to terminate the tenancy before the fixed term ends by giving each other a period of notice. A typical break clause in a fixed term one year tenancy agreement allows either party to serve the other two months notice after the first six months, so that the tenancy ends after a minimum period of eight months."
    },
    {
      topic: "Tenant",
      askedByUser: "Paul Lee & Co.",
      title: "Can my pet live in the flat?",
      answer: "Inform the Letting Agent when you first register that you have a pet (dog, cat, bird etc.), then you will be advised if a pet is allowed when you view properties. Some Landlords will not accept pets for various reasons such a building lease restrictions or unsuitability. If the Landlord advises they will accept your pet, then you should expect to be asked to pay an additional amount to be added to the deposit. A pet reference is useful if you have one from a previous Landlord."
    },

    /////////// Investor ///////////

    {
      topic: "Investor",
      askedByUser: "BlueBell Properties",
      title: "What is property sourcing?",
      answer: "Property sourcing is a term used when a person or company instructs a third party/individual to find and source a high yielding investment property on their behalf that they would not have been able to find their selves due to lack of contacts and market knowledge etc."
    },
    {
      topic: "Investor",
      askedByUser: "BlueBell Properties",
      title: "Why cant I source properties myself?",
      answer: "Anyone can buy an investment property however many buy properties that barely meet the mortgage payments each month. Nevertheless, it is not a good purchase as you are relying solely on capital appreciation through the market going up."
    },
    {
      topic: "Investor",
      askedByUser: "BlueBell Properties",
      title: "Do I need an income?",
      answer: "No, many lenders will lend to you despite not having a proven income."
    },
    {
      topic: "Investor",
      askedByUser: "",
      title: "How much deposit do I need to invest in property?",
      answer: "At least £40,000 for first time buyers and £50,000 for those who already have a mortgage. If you have owned your own home for a few years, you will have built up quite a bit of equity in your property. You will have paid off some of the loan, and there's a good chance that your property has increased in value too. Instead of finding a cash deposit, your bank/lender (subject to approvals) will allow you to use the equity built up in your home as security on your investment property. Our independent mortgage broker will determine the best strategy for you and your investment plans."
    },

    /////////// Agent ///////////

    {
      topic: "Agent",
      askedByUser: "Investopedia",
      title: "What skills do I need to become a real estate agent?",
      answer: "Becoming a successful real estate agent is a combination of investing time in education, researching a broker who can help you get your first clients and passing state and national licensing exams."
    }

  ];

  ///////////// Inserting Stuff /////////////


  //Topics.remove({});
  if (Topics.find({}).count() === 0) {
    _(topics).each(function (topic) {
      Topics.insert(topic);
    });
  }

  //Posts.remove({});
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




