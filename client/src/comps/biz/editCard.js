import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from '../../services/apiSer';
import PageHeader from '../common/pageHeader';


function EditCard(props) {
  let [card,setCard] = useState({})

  let { register, handleSubmit, setValue, formState: { errors } } = useForm();
  let history = useHistory();

  let nameRef = register("bizName", { required: true, minLength: 2 });
  let descRef = register("bizDescription", { required: true, minLength: 2 });
  let addressRef = register("bizAddress", { required: true, minLength: 2 });
  let phoneRef = register("bizPhone", { required: true, minLength: 2 });
  let imageRef = register("bizImage", { required: false });

  useEffect(() => {
    doApi();
  },[])


  const doApi = async() => {

    let url = API_URL+"/cards/single/"+props.computedMatch.params.id
    let data = await doApiGet(url);
    console.log(data);
    setCard(data);
   

    setValue("bizName",data.bizName);
    setValue("bizDescription",data.bizDescription);
    setValue("bizAddress",data.bizAddress);
    setValue("bizPhone",data.bizPhone);
    setValue("bizImage",data.bizImage);
  
  }

  const onSubForm = async (dataForm) => {
    console.log(dataForm);

    try {
      let url = API_URL + "/cards/" + props.computedMatch.params.id;
      let data = await doApiMethod(url, "PUT", dataForm);
      console.log(data)
      if (data.n === 1){
        toast.dark("Card's been updated");
        history.push("/myBizCards");
      }
    }
    catch (err) {
      console.log(err);
      toast.error("an error occurred , please come back later or try again");
    }
  }

  return (
    <div>
      <PageHeader title="Edit Card" />
      <form onSubmit={handleSubmit(onSubForm)} className="row p-5">
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
          <input   {...phoneRef} type="text" className="form-control mt-2" />
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
          <textarea {...descRef} className="form-control" rows="4"></textarea>
          {errors.bizDescription &&
            <small className="text-danger">* You must enter descrption of biz</small>
          }
        </div>
        <div className="col-12 text-center mb-3">
          <Link to="/myBizCards" className="btn btn-dark mt-4 me-2">Back to list</Link>
          <button className="btn btn-warning  mt-4">Update biz card</button>
        </div>
      </form>
    </div>
  )
}

export default EditCard;