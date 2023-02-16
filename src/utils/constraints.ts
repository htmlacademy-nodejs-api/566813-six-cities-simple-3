export enum OfferConstraints {
    TitleMinLength = 10,
    TitleMaxLength = 100,
    DescriptionMinLength = 20,
    DescriptionMaxLength = 1024,
    PreviewImageMaxLength = 256,
    DetailImageMaxLength = 256,
    DetaileImagesMinCount = 6,
    DetaileImagesMaxCount = 6,
    RoomsNumberMin = 1,
    RoomsNumberMax = 8,
    GuestsNumberMin = 1,
    GuestsNumberMax = 10,
    PriceMin = 100,
    PriceMax = 100000
}

export enum UserConstraints {
    NameMinLength = 1,
    NameMaxLength = 15,
    PasswordMinLength = 6,
    PasswordMaxLength = 12,
    AvatarPathMaxLength=256
}

export enum CommentConstraints {
    TextMinLength = 5,
    TextMaxLength = 1024,
    RaitingMin = 1,
    RaitngdMax = 5
}
