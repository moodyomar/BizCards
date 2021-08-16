import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify";
import { API_URL, doApiMethod } from '../../services/apiSer';

function AddCard(props) {

  let { register, handleSubmit, formState: { errors } } = useForm();
  let history = useHistory();

  let nameRef = register("bizName", { required: true, minLength: 2 });
  let descRef = register("bizDescription", { required: true, minLength: 2 });
  let addressRef = register("bizAddress", { required: true, minLength: 2 });
  let phoneRef = register("bizPhone", { required: true, minLength: 2 });
  let imageRef = register("bizImage", { required: false });

  const onSubForm = async (dataForm) => {
    console.log(dataForm);

    try {
      let url = API_URL + "/cards";
      let data = await doApiMethod(url, "POST", dataForm);
      console.log(data)
      if (data._id){
        toast.success("Card been added");
        history.push("/myBizCards");
      }
    }
    catch (err) {
      console.log(err);
      toast.error("There problem, come back next year!");
    }
  }

  return (
    <div>
      <h1>Add new card to your biz:</h1>
      <form onSubmit={handleSubmit(onSubForm)} className="row">
        <div className="col-lg-6">
          <label>*Biz name</label>
          <input {...nameRef} type="text" className="form-control mt-2" />
          {errors.bizName &&
            <small className="text-danger">* You must fill your name</small>
          }
        </div>

        <div className="col-lg-6">
          <label>*Biz address</label>
          <input  {...addressRef} type="text" className="form-control mt-2" />
          {errors.bizAddress &&
            <small className="text-danger">* You must Enter valid address</small>
          }
        </div>
        <div className="col-lg-6">
          <label>*Biz phone</label>
          <input  {...phoneRef} type="text" className="form-control mt-2" />
          {errors.bizPhone &&
            <small className="text-danger">* You must Enter valid Phone number</small>
          }
        </div>
        <div className="col-lg-6">
          <label>*Biz image url</label>
          <input  {...imageRef} type="text" className="form-control mt-2" />
          {errors.bizImage &&
            <small className="text-danger">* You must Enter valid url</small>
          }
        </div>
        <div className="col-lg-12">
          <label>*Biz info</label>
          <textarea {...descRef} class="form-control" rows="4"></textarea>
          {errors.bizDescription &&
            <small className="text-danger">* You must enter descrption of biz</small>
          }
        </div>
        <div className="col-12 text-center mb-3">
          <button className="btn btn-info  mt-4">Add new biz card</button>
        </div>
      </form>
    </div>
  )
}

export default AddCard