import React, { useState, useEffect } from "react";
import axios from "axios";

const getQuestionsOfCategory = (id) => {
  axios
    .get(
      `https://trusting-babbage.41-231-54-163.plesk.page/api/cards/show/${id}`
    )
    .then((res) => {
      return res.data.question.en;
    })
    .catch((err) => {
      console.log(err, "getQuestionsOfCategory");
    });
};

const getCategories = () => {
  axios
    .get(
      `https://trusting-babbage.41-231-54-163.plesk.page/api/cards`
    )
    .then((res) => {
      return res.data.question.en;
    })
    .catch((err) => {
      console.log(err, "getQuestionsOfCategory");
    });
};


const indexPerPack = (id) => {
  axios
    .get(
      `https://trusting-babbage.41-231-54-163.plesk.page/api/cards/${id}`
    )
    .then((res) => {
      return res.data.question.en;
    })
    .catch((err) => {
      console.log(err, "getQuestionsOfCategory");
    });
};


export default { getQuestionsOfCategory, getCategories, indexPerPack };
