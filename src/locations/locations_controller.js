"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocationData = exports.deleteSingleLocation = exports.addSingleLocation = exports.getSingleLocation = exports.getAllLocations = void 0;
const LocationModel = __importStar(require("./locations_model"));
const getAllLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield LocationModel.getLocations();
        res.status(200).json(locations);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err.message);
    }
});
exports.getAllLocations = getAllLocations;
const getSingleLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({ message: 'Invalid location ID.' });
        }
        const singleLocation = yield LocationModel.getLocationById(id);
        if (!singleLocation) {
            res.status(400).json({ message: 'Location not found.' });
        }
        else {
            res.status(200).json(singleLocation);
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.getSingleLocation = getSingleLocation;
const addSingleLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const addLocation = yield LocationModel.addNewLocation(data);
        res.status(200).json(addLocation);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.addSingleLocation = addSingleLocation;
const deleteSingleLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteLocation = yield LocationModel.deleteLocation(id);
        if (!deleteLocation) {
            res.status(400).json({ message: `Location ${id} not found in database` });
        }
        res.status(200).send({ message: `Location ${id} has been deleted` });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.deleteSingleLocation = deleteSingleLocation;
const updateLocationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = parseInt(req.params.id);
        const updateLocationInfo = yield LocationModel.patchLocationById(id, data);
        if (!updateLocationInfo) {
            res.status(400).json({ message: 'Location not found.' });
        }
        res.status(200).send({ message: `Location ${id} has been updated` });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.updateLocationData = updateLocationData;
