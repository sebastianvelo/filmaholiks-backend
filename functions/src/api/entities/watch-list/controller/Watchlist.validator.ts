import { body, param, ValidationChain } from "express-validator";
import MediaType from "@shared/types/MediaType";

const validateMediaType: ValidationChain = param("mediaType")
    .isString().withMessage("Media type must be a string")
    .custom((value) => Object.values(MediaType).includes(value as MediaType))
    .withMessage("Invalid media type");

const validateUid: ValidationChain = param("uid")
    .isString().withMessage("User ID must be a string")
    .notEmpty().withMessage("User ID is required");

const validateQuery: ValidationChain = param("query")
    .isString().withMessage("Query must be a string")
    .notEmpty().withMessage("Query is required");

const validateListIdx: ValidationChain = param("listIdx")
    .isNumeric().withMessage("List index must be a number");

const validateListIdxInBody: ValidationChain = body("listIdx")
    .isNumeric().withMessage("List index must be a number");

const validateListIdx1InBody: ValidationChain = body("listIdx1")
    .isNumeric().withMessage("List index 1 must be a number");

const validateListIdx2InBody: ValidationChain = body("listIdx2")
    .isNumeric().withMessage("List index 2 must be a number");

const validateTitle: ValidationChain = body("title")
    .isString().withMessage("Title must be a string")
    .notEmpty().withMessage("Title is required");

const validateItemId: ValidationChain = body("itemId")
    .isString().withMessage("Item ID must be a string")
    .notEmpty().withMessage("Item ID is required");

const validateItemIdx1: ValidationChain = body("itemIdx1")
    .isNumeric().withMessage("Item index 1 must be a number");

const validateItemIdx2: ValidationChain = body("itemIdx2")
    .isNumeric().withMessage("Item index 2 must be a number");

const validateItemIdx: ValidationChain = body("itemIdx")
    .isNumeric().withMessage("Item index must be a number");

const validateSourceListIdx: ValidationChain = body("sourceListIdx")
    .isNumeric().withMessage("Source list index must be a number");

const validateTargetListIdx: ValidationChain = body("targetListIdx")
    .isNumeric().withMessage("Target list index must be a number");

const validateListsArray: ValidationChain = body()
    .isArray().withMessage("Lists must be an array");

const WatchlistValidator = {
    search: [
        validateMediaType,
        validateUid,
        validateQuery
    ],
    getWatchlist: [
        validateMediaType,
        validateUid
    ],
    addList: [
        validateMediaType,
        validateUid,
        validateTitle
    ],
    saveAllLists: [
        validateMediaType,
        validateUid,
        validateListsArray
    ],
    deleteList: [
        validateMediaType,
        validateUid,
        validateListIdx
    ],
    swapLists: [
        validateMediaType,
        validateUid,
        validateListIdx1InBody,
        validateListIdx2InBody
    ],
    changeListTitle: [
        validateMediaType,
        validateUid,
        validateListIdxInBody,
        validateTitle
    ],
    addItem: [
        validateMediaType,
        validateUid,
        validateListIdx,
        validateItemId
    ],
    deleteItem: [
        validateMediaType,
        validateUid,
        validateListIdx,
        validateItemId
    ],
    swapItems: [
        validateMediaType,
        validateUid,
        validateListIdxInBody,
        validateItemIdx1,
        validateItemIdx2
    ],
    moveItem: [
        validateMediaType,
        validateUid,
        validateSourceListIdx,
        validateTargetListIdx,
        validateItemIdx
    ]
};

export default WatchlistValidator;