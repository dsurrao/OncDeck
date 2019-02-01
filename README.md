# OncDeck

# To Dos
This branch uses PouchDB/CouchDB as an alternative to the AWS stack in the master branch.
* User authentication: what is the alternative to AWS? Can we use Android device authentication?
* Watch/Un-watch patients: need user ids to associate with patients
* Clean up UI on patient page
* Form validation
* Update graph code

# AWS MobileHub configurations
https://github.com/dsurrao/oncdeckaws

# Settings
place your custom aws-exports.js file under src/assets

format:

```
const awsmobile = {
    'aws_app_analytics': 'enable',
    'aws_cognito_identity_pool_id': '',
    'aws_cognito_region': 'us-east-1',
    'aws_content_delivery': 'enable',
    'aws_content_delivery_bucket': '',
    'aws_content_delivery_bucket_region': 'us-east-1',
    'aws_content_delivery_cloudfront': 'enable',
    'aws_content_delivery_cloudfront_domain': '',
    'aws_mobile_analytics_app_id': '',
    'aws_mobile_analytics_app_region': 'us-east-1',
    'aws_project_id': '',
    'aws_project_name': 'OncDeck',
    'aws_project_region': 'us-east-1',
    'aws_resource_name_prefix': '',
    'aws_sign_in_enabled': 'enable',
    'aws_user_pools': 'enable',
    'aws_user_pools_id': '',
    'aws_user_pools_web_client_id': '',
}

export default awsmobile;
```

# CLI tools
install CLI tools listed in this tutorial: https://github.com/ionic-team/starters/tree/master/ionic-angular/official/aws

# to build and run
npm install
(if there are errors, delete package-lock.json and re-run)

ionic serve
