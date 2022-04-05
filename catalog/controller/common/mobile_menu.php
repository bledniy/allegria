<?php
class ControllerCommonMobileMenu extends Controller {
	public function index() {
		$this->load->language('common/menu');

		// Menu
		$this->load->model('catalog/category');

		$this->load->model('catalog/product');

		$data['categories'] = array();
        $data['search'] = $this->load->controller('common/search');
        $data['language'] = $this->load->controller('common/language');

        if (isset($this->request->get['path'])) {
            $url = '';

            $path = '';

            $parts = explode('_', (string)$this->request->get['path']);

            $data['cat_id_1']=$parts[0];
            if(!empty($parts[1])) {
                $data['cat_id_2'] = $parts[1];
            }

            $category_id = (int)array_pop($parts);

            if( isset( $parts[sizeof( $parts ) - 1] ) ){
                $data['category_id'] = $parts[sizeof( $parts ) - 1];
            }

            $data['child_id']    = $category_id;

            foreach ($parts as $path_id) {
                if (!$path) {
                    $path = (int)$path_id;
                } else {
                    $path .= '_' . (int)$path_id;
                }

            }
        }

$data['categories'] = [];
$categories_list = $this->model_catalog_category->getCategories(0);


foreach( $categories_list as $category ){
    // Level 2
    $children_data = array();

    $children = $this->model_catalog_category->getCategories($category['category_id']);

    foreach ($children as $child) {
        // Level 3
        $children2_data = array();

        $children2 = $this->model_catalog_category->getCategories($child['category_id']);

        foreach ($children2 as $child2) {
            $children2_data[] = [
                'name' => $child2['name'],
                'category_id' => $child2['category_id'],
                'href' => $this->url->link('product/category', 'path=' . $category['category_id'] . '_' . $child['category_id'] . '_' . $child2['category_id'])
            ];
        }

        $children_data[] = array(
            'name'     => $child['name'],
            'category_id' => $child['category_id'],
            'href'     => $this->url->link('product/category', 'path=' . $category['category_id'] . '_' . $child['category_id']),
            'children' => $children2_data
        );
    }

    // Level 1
    $data['categories'][] = array(
        'name'     => $category['name'],
        'category_id' => $category['category_id'],
        'children' => $children_data,
        'href'     => $this->url->link('product/category', 'path=' . $category['category_id'])
    );
}

        $data['manufacturers'] = [];
        $manufacturers = $this->model_catalog_manufacturer->getManufacturers([
            'start' => 0,
            'limit' => 4
        ]);

        foreach( $manufacturers as $manufacturer ){
            $data['manufacturers'][] = [
                'href' => $this->url->link('product/manufacturer/info', 'manufacturer_id=' . $manufacturer['manufacturer_id']),
                'name' => $manufacturer['name']
            ];
        }

		return $this->load->view('common/mobile_menu', $data);
	}
}
