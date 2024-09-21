import React from 'react'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { message, Modal } from 'antd';
import { deleteTheatre } from '../../api_services/theatre_services';

function DeleteTheatreModal({
  isDeleteModalOpen, setIsDeleteModalOpen, getData, selectedTheatre, setSelectedTheatre
}) {

  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      dispatch(ShowLoading());
      const response = await deleteTheatre(selectedTheatre._id);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      handleCancel();
      dispatch(HideLoading());
    } catch (e) {
      message.error(e.message);
      handleCancel();
      dispatch(HideLoading());
    }
  };

  const handleCancel = () => {
    setSelectedTheatre(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <Modal
      centered
      title="Delete Theatre"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}>Are you sure you want to delete this theatre?</Modal>
  );
};

export default DeleteTheatreModal