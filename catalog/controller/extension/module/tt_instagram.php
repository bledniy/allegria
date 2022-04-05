<?php

class ControllerExtensionModuleTTInstagram extends Controller {
    public function index() {

        $data['is_error'] = false;
        $title = $this->config->get('module_tt_instagram_module_name');
        if (isset($title) && $title != "") {
            $data['title'] = $title;
        } else {
            $data['title'] = "";
        }

        /*$stylesheet = $this->config->get('module_tt_instagram_image_stylesheet');
        if (isset($stylesheet) && $stylesheet != "") {
            $data['stylesheet'] = $stylesheet;
        } else {
            $data['stylesheet'] =
            "
                #TT-instagram-feed {
                    text-align: center;
                }
                #TT-instagram-feed h2 {
                    margin: 40px 0 24px 0;
                }
                #TT-instagram-feed .image-wrapper {
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                }
                #TT-instagram-feed .image-wrapper img {
					max-width: 100%;
                }
            ";
        }*/

        $limit = $this->config->get('module_tt_instagram_limit');
        if (isset($limit) && $limit != "") {
            $limit = $limit;
        } else {
            $limit = 50;
        }
		
        $access_token = $this->config->get('module_tt_instagram_access_token');
        $username = $this->config->get('module_tt_instagram_username');

        $data['username'] = $username;

        $json_link="https://api.instagram.com/v1/users/self/media/recent/?";
        $json_link.="access_token={$access_token}&count={$limit}";

        $json = file_get_contents($json_link);
        $posts = json_decode(preg_replace('/("\w+"):(\d+)/', '\\1:"\\2"', $json), true);

        $data["images"] = [];

        foreach ($posts['data'] as $post) {
             array_push($data["images"], $post['images']['low_resolution']['url']);
        }
         return $this->load->view('extension/module/tt_instagram', $data);
    }
}