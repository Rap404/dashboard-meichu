import React, { useEffect, useState } from "react";
import Slideshow from "../components/CobaSlideShow";
import Modal from "../components/modal/Modal";
import { baseUrl } from "../Constant";
import Button from "../components/buttons/Button";
import SubmitButton from "../components/buttons/SubmitButton";
import LoadingComponent from "../components/text/Loading";
import { errorNotif, successNotif } from "../components/text/Notification";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import { uploadFileTostrapi } from "../lib/ImageHandler";
import { frontImageService } from "../Api/services/contentService";
import FormFrontImages from "./form pages/FormFrontImages";
import FormCustomImages from "./form pages/formCustomImages";

const ContentPage = () => {
  return (
    <div className="overflow-auto w-full h-screen py-10 pb-32 px-20">
      <FormFrontImages />
      <FormCustomImages />
    </div>
  );
};

export default ContentPage;
