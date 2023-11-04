const express = require("express");
const FelhasznaloDAO = require('../dao/users-dao');
//többi dao ide jön

const jwt = require('jsonwebtoken')
const jwtSecret = require("./../config/auth.js");
const router = express.Router();
