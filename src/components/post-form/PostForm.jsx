// ek aisa componennt jo post add karte tym bhi kaam aaye and post update karte tym bhi kaam aaye 
import React, { useCallback, useEffect } from 'react'
import { Button, Input, Logo, RTE } from "../index"
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import Select from '../Select'

export default function PostForm({ post }) {

  // useform default values bhi provide karta hai
  const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },                                     // default values de rhe h cuz in case user edit karne aaya ho to we provide default values.
    // and default values humare paas aayengi jo bhi is postform ko use karega usse (edit button par click karke hi idhar aaye honge to we get post info from there)
  })
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // submit par do conditions hai ya to post phle se available hai ya phir not 
  const submit = async (data) => {
    console.log("user data is-------", userData);
    console.log("data is ---hui hui hui ", data);
    if (post) {
      // new image store kara k rakh li file naam k variable m
      const file = data.image[0] ? appwriteService.uploadFile(data.img[0]) : null;
      // deleting a file 
      if (file) {
        await appwriteService.deleteFile(post.featuredImage)
      }
      // updating file 
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        console.log("user data is********", userData);
        console.log("file is ---------", file)
        const fileId = file.$id;
        console.log("file id is--------", fileId);
        data.featuredImage = fileId;
        console.log("featuredImage is---------", data.featuredImage);
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
        console.log("--------", dbPost);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  }
  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string")
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {          // ye watch react hook form se milta hai iske andar callback function hota hai and usme value and name hota hai
      if (name === 'title') {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();

  }, [watch, slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>

    </form>
  )
}






