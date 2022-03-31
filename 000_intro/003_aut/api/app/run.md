Powershell:
        
        $env:FLASK_ENV='development';$env:FLASK_APP='app'; python -m flask run
        docker build --tag python-docker .        
        docker run --rm -p 5001:5000 python-docker

Test:

        Invoke-WebRequest -Uri http://localhost:5001/ -Method GET