<?php
class ControllerCommonMenu extends Controller {
	public function index() {
		$this->load->language('common/menu');

		// Menu
		$this->load->model('catalog/category');
		$this->load->model('catalog/manufacturer');

		$this->load->model('catalog/product');

		$data['categories'] = array();

		$categories = $this->model_catalog_category->getCategories(0);

		foreach ($categories as $category) {
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
						'href' => $this->url->link('product/category', 'path=' . $category['category_id'] . '_' . $child['category_id'] . '_' . $child2['category_id'])
					];
				}

				$children_data[] = array(
					'name'     => $child['name'],
					'href'     => $this->url->link('product/category', 'path=' . $category['category_id'] . '_' . $child['category_id']),
					'children' => $children2_data
				);
			}

			// Level 1
			$data['categories'][] = array(
				'name'     => $category['name'],
				'children' => $children_data,
				'column'   => $category['column'] ? $category['column'] : 1,
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

		return $this->load->view('common/menu', $data);
	}
}
