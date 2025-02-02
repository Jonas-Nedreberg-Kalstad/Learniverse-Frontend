import axios from "axios";
import { URL } from "./url";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Get = async (endpoint) => {
  try {
    const token = cookies.get("JWT")
    const header = token ? {headers: {Authorization: `Bearer ` + token}} : {};
    console.log(header);
    const response = await axios.get(`${URL.BACKEND}/${endpoint}`, header);
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    //window.location.href = "/login";
    throw error;
  }
};

export const Post = async (endpoint, data) => {
  try {
    const token = cookies.get("JWT")
    const header = token ? {headers: {Authorization: `Bearer ` + token}} : {};
    const response = await axios.post(`${URL.BACKEND}/${endpoint}`, data, header);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    //window.location.href = "/login";
    throw error;
  }
};

export const Put = async (endpoint, data) => {
  try {
    const token = cookies.get("JWT")
    const header = token ? {headers: {Authorization: `Bearer ` + token}} : {};
    const response = await axios.put(`${URL.BACKEND}/${endpoint}`, data, header);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    //window.location.href = "/login";
    throw error;
  }
};

export const Patch = async (endpoint, data) => {
  try {
    const token = cookies.get("JWT")
    const header = token ? {headers: {Authorization: `Bearer ` + token}} : {};
    const response = await axios.patch(`${URL.BACKEND}/${endpoint}`, data, header);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    //window.location.href = "/login";
    throw error;
  }
};

export const Delete = async (endpoint) => {
  try {
    const token = cookies.get("JWT")
    const header = token ? {headers: {Authorization: `Bearer ` + token}} : {};
    const response = await axios.delete(`${URL.BACKEND}/${endpoint}`, header);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    //window.location.href = "/login";
    throw error;
  }
};