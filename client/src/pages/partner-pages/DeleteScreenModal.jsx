
import React from 'react'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { message, Modal } from 'antd';
import { deleteScreen } from 'api_services/screen_services';

function DeleteScreenModal({
  isDeleteModalOpen, setIsDeleteModalOpen, getData, selectedScreen, setSelectedScreen
}) {

  const dispatch = useDispatch();
  const handleOk = async () => {
    try {
      dispatch(ShowLoading());
      const response = await deleteScreen(selectedScreen._id);
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
    setSelectedScreen(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <Modal
      centered
      title="Delete Screen"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}>Are you sure you want to delete this screen?</Modal>
  );
};

export default DeleteScreenModal