import React, { useState } from 'react'
import axios from "axios"
import {useForm} from "react-hook-form";
import {z} from "zod";
import{zodResolver} from "@hookform/resolver/zod";

const userschema = z.object({
     name: z
          .string()
          .min(3,"Name must be at least 3 characters"),

     email: z
          .string()
          .email("Enter a valid email"),
     
     password: z
     .string()
     .min(8,"Password must be at least 8 characters"),
});


export default function ZodForm(){

     const {
          register,
          handleSubmit,
          formState :{errors},
     } = useForm({
          resolver : zodResolver(userSchema),
     });

     const onSubmit = (data) =>{}
}