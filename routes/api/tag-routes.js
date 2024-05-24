const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try { 
    const tagList = await Tag.findAll({ 
      include: [{model: Product, through: ProductTag}]
    })
    console.log('tag-routes GET');
    res.status(200).json({ message: 'Tags found', data: tagList, })
  } catch (err) {
    console.error(err);
    console.log('tag-routes GET');
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const selectedTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!selectedTag) {
      res.status(404).json({ message: 'No tag found witht that ID!', data: selectedTag, });
    }
    console.log('tag-routes GET by id');
    res.status(200).json({ message: 'Tag found' });
  } catch (err) {
    console.error(err);
    console.log('tag-routes GET by id');
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    console.log('tag-routes POST');
    res.status(200).json({ message: 'Tag created' })
  } catch (err) {
    console.error(err);
    console.log('tag-routes POST');
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if(!updateTag) {
      res.status(404).json({ message: 'No tag found with that ID!' });
    }
    console.log('tag-routes PUT');
    res.status(500).json({ message: 'Tag updated'});
  } catch (err) {
    console.error(err);
    console.log('tag-routes PUT');
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with that ID!' })
    }
    console.log('tag-routes DELETE');
    res.status(200).json({ message: 'Tag deleted' });
  } catch (err) {
    console.error(err);
    console.log('tag-routes DELETE');
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
