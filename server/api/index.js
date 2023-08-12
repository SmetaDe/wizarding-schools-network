"use strict";
const router = require("express").Router();

// require your database and place your routes here
const { School, Student } = require("../db");

router.get("/School", async (req, res, next) => {
    try {
        const allSchools = await School.findAll();
        res.send(allSchools);
    }
    catch (err) {
        next(err);
    }
});

router.get("/School/:id", async (req, res, next) => {
    try {
        const oneSchool = await School.findByPk(req.params.id);
        res.send(oneSchool);
    } catch (err) {
        next(err);
    }
});

router.post("/School", async (req, res, next) => {
    try {
        const newSchool = await School.create(req.body);
        res.send(newSchool);
    } catch(err) {
        next(err);
    }
});

router.delete("/School/:id", async (req, res, next) => {
    try { 
        const oneSchool = await School.findByPk(req.params.id);
        oneSchool.destroy();
        res.sendStatus(200);  }
    catch (err) {
        next(err);
    }
});

router.put("/School/:id", async (req, res, next) => {
    try {
        const oneSchool = await School.findByPk(req.params.id);
        oneSchool.update(req.body);
        res.send(oneSchool);
    }
    catch (err) {
        next(err);
    }
});

router.get("/Student", async (req, res, next) => {
    try {
        const allStudents = await Student.findAll();
        res.send(allStudents);
    } catch(err) {
        next(err);
    }
});

router.get("/Student/:id", async (req, res, next) => {
    try {
        const oneStudent = await Student.findByPk(req.params.id);
        res.send(oneStudent);
    }
    catch (err) {
        next(err);
    }
});

router.post("/Student", async (req, res, next) => {
    try {
        const newStudent = await Student.crate(req.body);
        res.send(newStudent);
    } catch(err) {
        next(err);
    }
});

router.delete("/Student/:id", async (req, res, next) => {
    try { 
        const oneStudent = await Student.findByPk(req.params.id);
        oneStudent.destroy();
        res.sendStatus(200);  }
    catch (err) {
        next(err);
    }
});

router.put("/Student/:id", async (req, res, next) => {
    try {
        const oneStudent = await Student.findByPk(req.params.id);
        oneStudent.update(req.body);
        res.send(oneStudent);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router; 
