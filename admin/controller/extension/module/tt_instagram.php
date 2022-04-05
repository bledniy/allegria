<?php
class ControllerExtensionModuleTTInstagram extends Controller {
    private $error = array();

    public function index() {
        $this->load->language('extension/module/tt_instagram');

        $this->document->setTitle($this->language->get('heading_title'));

        $this->load->model('setting/setting');
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			$this->model_setting_setting->editSetting('module_tt_instagram', $this->request->post);
           
			$this->session->data['success'] = $this->language->get('text_success');
			
			$this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true));
        }

        $data['heading_title'] = $this->language->get('heading_title');
        $data['text_edit'] = $this->language->get('text_edit');
        $data['text_enabled'] = $this->language->get('text_enabled');
        $data['text_disabled'] = $this->language->get('text_disabled');

        $data['entry_status'] = $this->language->get('entry_status');
        $data['button_save'] = $this->language->get('button_save');
        $data['button_cancel'] = $this->language->get('button_cancel');


		if(isset($this->session->data['success_tt_instagram'])) {
			$data['text_success_clear'] = $this->session->data['success_tt_instagram'];

			unset($this->session->data['success_tt_instagram']);
		}else{
			$data['text_success_clear'] = '';
		}

        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }
		if (isset($this->error['name'])) {
			$data['error_name'] = $this->error['name'];
		} else {
			$data['error_name'] = '';
		}

		if (isset($this->error['width'])) {
			$data['error_width'] = $this->error['width'];
		} else {
			$data['error_width'] = '';
		}
		if (isset($this->error['height'])) {
			$data['error_height'] = $this->error['height'];
		} else {
			$data['error_height'] = '';
		}
		
        $data['breadcrumbs'] = array();

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'], true)
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_extension'),
            'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true)
        );
		if (!isset($this->request->get['module_id'])) {
			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('heading_title'),
				'href' => $this->url->link('extension/module/tt_instagram', 'user_token=' . $this->session->data['user_token'], true)
			);
		} else {
			$data['breadcrumbs'][] = array(
				'text' => $this->language->get('heading_title'),
				'href' => $this->url->link('extension/module/tt_instagram', 'user_token=' . $this->session->data['user_token'] . '&module_id=' . $this->request->get['module_id'], true)
			);			
		}

		if (!isset($this->request->get['module_id'])) {
			$data['action'] = $this->url->link('extension/module/tt_instagram', 'user_token=' . $this->session->data['user_token'], true);
		} else {
			$data['action'] = $this->url->link('extension/module/tt_instagram', 'user_token=' . $this->session->data['user_token'] . '&module_id=' . $this->request->get['module_id'], true);
		}

        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', true);

		if (isset($this->request->get['module_id']) && ($this->request->server['REQUEST_METHOD'] != 'POST')) {
			$module_info = $this->model_extension_module->getModule($this->request->get['module_id']);
		}

        if (isset($this->request->post['module_tt_instagram_status'])) {
            $data['module_tt_instagram_status'] = $this->request->post['module_tt_instagram_status'];
        } else {
            $data['module_tt_instagram_status'] = $this->config->get('module_tt_instagram_status');
        }

        if (isset($this->request->post['module_tt_instagram_access_token'])) {
            $data['tt_instagram_access_token_value'] = $this->request->post['module_tt_instagram_access_token'];
        } else {
            $data['tt_instagram_access_token_value'] = $this->config->get('module_tt_instagram_access_token');
        }

        if (isset($this->request->post['module_tt_instagram_username'])) {
            $data['module_tt_instagram_username_value'] = $this->request->post['module_tt_instagram_username'];
        } else {
            $data['module_tt_instagram_username_value'] = $this->config->get('module_tt_instagram_username');
        }

        if (isset($this->request->post['module_tt_instagram_limit'])) {
            $data['tt_instagram_limit_value'] = $this->request->post['module_tt_instagram_limit'];
        } else {
            $data['tt_instagram_limit_value'] = $this->config->get('module_tt_instagram_limit');
        }

        if (isset($this->request->post['module_tt_instagram_module_name'])) {
            $data['module_name_title_value'] = $this->request->post['module_tt_instagram_module_name'];
        } else {
            $data['module_name_title_value'] = $this->config->get('module_tt_instagram_module_name');
        }

        if (isset($this->request->post['module_tt_instagram_error_title'])) {
            $data['error_title_value'] = $this->request->post['module_tt_instagram_error_title'];
        } else {
            $data['error_title_value'] = $this->config->get('module_tt_instagram_error_title');
        }

        if (isset($this->request->post['module_tt_instagram_image_stylesheet'])) {
            $data['stylesheet_value'] = $this->request->post['module_tt_instagram_image_stylesheet'];
        } else {
            $data['stylesheet_value'] = $this->config->get('module_tt_instagram_image_stylesheet');
        }

        $data['tt_instagram_username'] = $this->language->get('tt_instagram_username');
        $data['tt_instagram_access_token'] = $this->language->get('tt_instagram_access_token');
        $data['tt_instagram_username_placeholder'] = $this->language->get('tt_instagram_username_placeholder');
        $data['limit_text'] = $this->language->get('limit_text');
        $data['limit_text_placeholder'] = $this->language->get('limit_text_placeholder');
        $data['module_name_title'] = $this->language->get('module_name_title');
        $data['module_name_placeholder'] = $this->language->get('module_name_placeholder');
        $data['error_title'] = $this->language->get('error_title');
        $data['error_title_placeholder'] = $this->language->get('error_placeholder');
        $data['stylesheet'] = $this->language->get('stylesheet');

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/tt_instagram', $data));
    }

    protected function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/tt_instagram')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        return !$this->error;
    }
}