<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;

class JWTInvalidListener
{
    /**
     * Erreur lorsque le token est invalide
     * @param JWTInvalidEvent $event
     */
    public function onJWTInvalid(JWTInvalidEvent $event)
    {
        $response = new JWTAuthenticationFailureResponse('Une erreur s\'est produite, veuillez vous reconnecter', 403);

        $event->setResponse($response);
    }
}