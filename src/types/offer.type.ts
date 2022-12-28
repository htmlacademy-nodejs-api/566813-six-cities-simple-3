export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: ???;
    previewImage: string;
    detailImage: []&&;
    isPremium: Boolean;
    rating: Number;
    housingType: OfferType&&Enum;
    roomsNumber: Number;
    guestsNumber: Number;
    price: Number;;
    features: [];
    user: User;
    commentsNumber?: Number;
    location: [];
    cities: City??
  }